import { Controller, Get, Post, Patch, Delete, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';
import { UserService } from './user.service';
import { PaginationQuery } from '../common/pagination';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { CreateFollowDto } from './dto/create-follow.dto';
import { CreateReviewDto } from './dto/create-review.dto';
import { RechargeBalanceDto } from './dto/recharge-balance.dto';

const DEFAULT_USER_ID = 'default-user';

@ApiTags('我的')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('info')
  @ApiOperation({
    summary: '获取用户信息',
    description: '返回当前登录用户的个人信息，包括头像、昵称、会员等级、账户余额等。余额可用于下单支付。',
  })
  @ApiResponse({ status: 200, description: '成功返回用户信息，包含 avatar、nickname、level、balance 等字段' })
  @ApiResponse({ status: 404, description: '用户不存在，当前用户ID在用户表中未找到' })
  getUserInfo() {
    return this.userService.getUserInfo(DEFAULT_USER_ID);
  }

  // ==================== 余额充值 ====================

  @Post('balance/recharge')
  @ApiOperation({
    summary: '余额充值',
    description: '为当前用户账户充值指定金额。金额必须大于0，充值后余额立即到账。',
  })
  @ApiBody({ type: RechargeBalanceDto })
  @ApiResponse({ status: 201, description: '充值成功，返回更新后的用户信息（含新余额）' })
  @ApiResponse({ status: 400, description: '金额不合法' })
  rechargeBalance(@Body() dto: RechargeBalanceDto) {
    return this.userService.rechargeBalance(DEFAULT_USER_ID, dto.amount);
  }

  // ==================== 收货地址 ====================

  @Get('addresses')
  @ApiOperation({
    summary: '获取收货地址列表',
    description: '返回当前用户的全部收货地址，按默认地址优先排序。默认地址 isDefault=true 会排在最前面。每位用户最多可保存 20 个地址。',
  })
  @ApiResponse({ status: 200, description: '成功返回地址列表，默认地址排首位。每项含 name、phone、address、isDefault 等字段' })
  @ApiResponse({ status: 404, description: '用户不存在' })
  getAddresses() {
    return this.userService.getAddresses(DEFAULT_USER_ID);
  }

  @Post('addresses')
  @ApiOperation({
    summary: '新增收货地址',
    description: '为当前用户新增一条收货地址。若 isDefault 设为 true，系统会自动将该用户的其他地址设为非默认，确保同一用户只有一个默认地址。',
  })
  @ApiBody({ type: CreateAddressDto })
  @ApiResponse({ status: 201, description: '创建成功，返回新地址详情（含自动生成的地址ID）' })
  @ApiResponse({ status: 400, description: '参数校验失败，如 name、phone、address 为空' })
  createAddress(@Body() dto: CreateAddressDto) {
    return this.userService.createAddress(DEFAULT_USER_ID, dto);
  }

  @Patch('addresses/:id')
  @ApiOperation({
    summary: '修改收货地址',
    description: '更新指定地址的信息，所有字段均为可选，只传需要修改的字段。若将 isDefault 设为 true，系统会自动取消该用户的其他默认地址。只能修改自己的地址。',
  })
  @ApiParam({ name: 'id', description: '地址ID，即 Address 记录的唯一标识', example: 'addr-1' })
  @ApiBody({ type: UpdateAddressDto })
  @ApiResponse({ status: 200, description: '修改成功，返回更新后的地址详情' })
  @ApiResponse({ status: 400, description: '参数校验失败' })
  @ApiResponse({ status: 404, description: '地址不存在，或该地址不属于当前用户' })
  updateAddress(@Param('id') id: string, @Body() dto: UpdateAddressDto) {
    return this.userService.updateAddress(id, DEFAULT_USER_ID, dto);
  }

  @Delete('addresses/:id')
  @ApiOperation({
    summary: '删除收货地址',
    description: '删除指定的收货地址。删除后不可恢复。只能删除自己的地址。若删除的是默认地址，剩余地址不会自动升级为默认。',
  })
  @ApiParam({ name: 'id', description: '地址ID', example: 'addr-1' })
  @ApiResponse({ status: 200, description: '删除成功，返回被删除的地址信息' })
  @ApiResponse({ status: 404, description: '地址不存在，或该地址不属于当前用户' })
  deleteAddress(@Param('id') id: string) {
    return this.userService.deleteAddress(id, DEFAULT_USER_ID);
  }

  // ==================== 订单 ====================

  @Get('orders')
  @ApiOperation({
    summary: '获取订单列表',
    description: '返回当前用户的订单列表，支持按状态、时间范围、金额范围筛选。每个订单包含订单商品列表、商家信息、总金额、下单时间等。状态枚举：pending（待付款）、paid（待发货）、shipped（待收货）、completed（已收货）、cancelled（已取消）。返回 { items, total, page, limit }。',
  })
  @ApiQuery({ name: 'status', required: false, description: '按订单状态筛选。可选值：pending/paid/shipped/completed/cancelled', example: 'paid' })
  @ApiQuery({ name: 'startDate', required: false, description: '开始时间（ISO格式），筛选下单时间 >= 此值', example: '2026-01-01' })
  @ApiQuery({ name: 'endDate', required: false, description: '结束时间（ISO格式），筛选下单时间 <= 此值', example: '2026-12-31' })
  @ApiQuery({ name: 'minAmount', required: false, description: '最低金额', example: 100 })
  @ApiQuery({ name: 'maxAmount', required: false, description: '最高金额', example: 500 })
  @ApiQuery({ name: 'page', required: false, description: '页码，默认为1', example: 1 })
  @ApiQuery({ name: 'limit', required: false, description: '每页条数，默认为10', example: 10 })
  @ApiResponse({ status: 200, description: '成功返回订单列表，格式 { items, total, page, limit }' })
  getOrders(
    @Query('status') status: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Query('minAmount') minAmount: string,
    @Query('maxAmount') maxAmount: string,
    @Query() query: PaginationQuery,
  ) {
    return this.userService.getOrders(DEFAULT_USER_ID, status, query, {
      startDate,
      endDate,
      minAmount: minAmount ? Number(minAmount) : undefined,
      maxAmount: maxAmount ? Number(maxAmount) : undefined,
    });
  }

  @Get('orders/:id')
  @ApiOperation({
    summary: '获取订单详情',
    description: '返回指定订单的完整详情，包含订单商品列表（含规格信息）、商家信息、总金额、状态、备注、下单时间等。',
  })
  @ApiParam({ name: 'id', description: '订单ID', example: 'order-1' })
  @ApiResponse({ status: 200, description: '成功返回订单详情' })
  @ApiResponse({ status: 404, description: '订单不存在，或不属于当前用户' })
  getOrderById(@Param('id') id: string) {
    return this.userService.getOrderById(id, DEFAULT_USER_ID);
  }

  @Post('orders')
  @ApiOperation({
    summary: '创建订单（余额支付）',
    description: '创建新订单并使用账户余额支付。系统会自动从数据库查询商品真实价格计算总金额（前端无需传价格），并校验用户余额是否充足。支持选择商品规格（specId），有规格时使用规格价格和库存。支付成功后自动扣减余额和库存，订单状态为 paid。',
  })
  @ApiBody({ type: CreateOrderDto })
  @ApiResponse({ status: 201, description: '下单成功，返回订单详情' })
  @ApiResponse({ status: 400, description: '下单失败：余额不足、商品不存在、库存不足等' })
  @ApiResponse({ status: 404, description: '商家不存在或商品不存在' })
  createOrder(@Body() dto: CreateOrderDto) {
    return this.userService.createOrder(DEFAULT_USER_ID, dto);
  }

  @Patch('orders/:id/cancel')
  @ApiOperation({
    summary: '取消订单',
    description: '取消指定的待付款订单。取消后自动退还用户余额、恢复商品库存、回减销量。只有 status=pending 的订单可以取消。',
  })
  @ApiParam({ name: 'id', description: '订单ID', example: 'order-1' })
  @ApiResponse({ status: 200, description: '取消成功，返回更新后的订单（status=cancelled）' })
  @ApiResponse({ status: 400, description: '订单状态不是待付款，无法取消' })
  @ApiResponse({ status: 404, description: '订单不存在' })
  cancelOrder(@Param('id') id: string) {
    return this.userService.cancelOrder(id, DEFAULT_USER_ID);
  }

  @Patch('orders/:id/confirm')
  @ApiOperation({
    summary: '确认收货',
    description: '确认收到商品，将订单状态从 shipped 变更为 completed。只有 status=shipped 的订单可以确认收货。',
  })
  @ApiParam({ name: 'id', description: '订单ID', example: 'order-1' })
  @ApiResponse({ status: 200, description: '确认成功，返回更新后的订单（status=completed）' })
  @ApiResponse({ status: 400, description: '订单状态不是已发货，无法确认收货' })
  @ApiResponse({ status: 404, description: '订单不存在' })
  confirmOrder(@Param('id') id: string) {
    return this.userService.confirmOrder(id, DEFAULT_USER_ID);
  }

  // ==================== 收藏 ====================

  @Get('favorites')
  @ApiOperation({
    summary: '获取我的收藏列表',
    description: '返回当前用户收藏的商品列表，按收藏时间倒序排列。返回 { items, total, page, limit }。',
  })
  @ApiQuery({ name: 'page', required: false, description: '页码，默认为1', example: 1 })
  @ApiQuery({ name: 'limit', required: false, description: '每页条数，默认为10', example: 10 })
  @ApiResponse({ status: 200, description: '成功返回收藏列表，格式 { items, total, page, limit }' })
  getFavorites(@Query() query: PaginationQuery) {
    return this.userService.getFavorites(DEFAULT_USER_ID, query);
  }

  @Post('favorites')
  @ApiOperation({
    summary: '添加收藏',
    description: '将指定商品加入收藏夹。同一商品不可重复收藏，若已收藏过则直接返回已有记录（幂等操作）。',
  })
  @ApiBody({ type: CreateFavoriteDto })
  @ApiResponse({ status: 201, description: '收藏成功（或已收藏过直接返回），返回收藏记录详情' })
  @ApiResponse({ status: 404, description: '商品不存在，传入的 productId 在商品表中未找到' })
  addFavorite(@Body() dto: CreateFavoriteDto) {
    return this.userService.addFavorite(DEFAULT_USER_ID, dto.productId);
  }

  @Delete('favorites/:id')
  @ApiOperation({
    summary: '取消收藏',
    description: '从收藏夹中移除指定收藏记录。只能取消自己的收藏。删除后不可恢复，需重新收藏。',
  })
  @ApiParam({ name: 'id', description: '收藏记录ID（非商品ID）', example: 'fav-1' })
  @ApiResponse({ status: 200, description: '取消成功，返回被删除的收藏记录' })
  @ApiResponse({ status: 404, description: '收藏记录不存在，或不属于当前用户' })
  removeFavorite(@Param('id') id: string) {
    return this.userService.removeFavorite(id, DEFAULT_USER_ID);
  }

  // ==================== 关注店铺 ====================

  @Get('follows')
  @ApiOperation({
    summary: '获取关注的店铺列表',
    description: '返回当前用户关注的店铺列表，按关注时间倒序排列。返回 { items, total, page, limit }。',
  })
  @ApiQuery({ name: 'page', required: false, description: '页码，默认为1', example: 1 })
  @ApiQuery({ name: 'limit', required: false, description: '每页条数，默认为10', example: 10 })
  @ApiResponse({ status: 200, description: '成功返回关注店铺列表，格式 { items, total, page, limit }' })
  getFollows(@Query() query: PaginationQuery) {
    return this.userService.getFollows(DEFAULT_USER_ID, query);
  }

  @Post('follows')
  @ApiOperation({
    summary: '关注店铺',
    description: '将指定店铺加入关注列表。同一店铺不可重复关注，若已关注过则直接返回已有记录（幂等操作）。',
  })
  @ApiBody({ type: CreateFollowDto })
  @ApiResponse({ status: 201, description: '关注成功（或已关注过直接返回），返回关注记录详情' })
  @ApiResponse({ status: 404, description: '店铺不存在，传入的 merchantId 在商家表中未找到' })
  addFollow(@Body() dto: CreateFollowDto) {
    return this.userService.addFollow(DEFAULT_USER_ID, dto.merchantId);
  }

  @Delete('follows/:id')
  @ApiOperation({
    summary: '取消关注',
    description: '从关注列表中移除指定关注记录。只能取消自己的关注。删除后不可恢复，需重新关注。',
  })
  @ApiParam({ name: 'id', description: '关注记录ID（非商家ID）', example: 'follow-1' })
  @ApiResponse({ status: 200, description: '取消成功，返回被删除的关注记录' })
  @ApiResponse({ status: 404, description: '关注记录不存在，或不属于当前用户' })
  removeFollow(@Param('id') id: string) {
    return this.userService.removeFollow(id, DEFAULT_USER_ID);
  }

  // ==================== 评价 ====================

  @Post('reviews')
  @ApiOperation({
    summary: '发表商品评价',
    description: '对已完成订单中的商品进行评价。评分1-5星，可选文字和图片。同一用户对同一商品在同一订单中只能评价一次。',
  })
  @ApiBody({ type: CreateReviewDto })
  @ApiResponse({ status: 201, description: '评价成功，返回评价记录' })
  @ApiResponse({ status: 400, description: '订单未完成、已评价过、评分不在1-5范围等' })
  @ApiResponse({ status: 404, description: '订单不存在' })
  createReview(@Body() dto: CreateReviewDto) {
    return this.userService.createReview(DEFAULT_USER_ID, dto);
  }
}
