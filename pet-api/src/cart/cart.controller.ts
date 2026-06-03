import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { AddCartDto } from './dto/add-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

const DEFAULT_USER_ID = 'default-user';

@ApiTags('购物车')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  @ApiOperation({
    summary: '获取购物车列表（按商家分组）',
    description: '返回当前用户的全部购物车商品，按商家分组展示。每个分组包含商家信息和商品列表，商品信息含名称、价格、图片、数量等。若购物车为空则返回空数组。',
  })
  @ApiResponse({ status: 200, description: '成功返回购物车列表，按商家分组。每个分组包含 merchant 信息和 items 数组' })
  @ApiResponse({ status: 500, description: '服务器内部错误，如数据库连接异常' })
  getCart() {
    return this.cartService.getCartGroupedByMerchant(DEFAULT_USER_ID);
  }

  @Post()
  @ApiOperation({
    summary: '加入购物车',
    description: '将商品添加到购物车。若该商品在购物车中已存在（同一 productId + merchantId），则自动累加数量而非重复创建；若不存在则新建一条记录。传入的商品信息将从数据库校验。',
  })
  @ApiBody({ type: AddCartDto })
  @ApiResponse({ status: 201, description: '添加成功，返回购物车项详情（含累加后的新数量）' })
  @ApiResponse({ status: 400, description: '参数校验失败，如 productId 为空或 quantity 小于 1' })
  @ApiResponse({ status: 404, description: '商品不存在，productId 在商品表中未找到对应记录' })
  addToCart(@Body() dto: AddCartDto) {
    return this.cartService.addToCart(DEFAULT_USER_ID, dto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: '修改购物车商品数量',
    description: '更新购物车中指定商品的购买数量。传入新的 quantity 值直接覆盖原有数量。可用于加减商品数量的场景。',
  })
  @ApiParam({ name: 'id', description: '购物车项ID，即 CartItem 的唯一标识', example: 'cart-item-1' })
  @ApiBody({ type: UpdateCartDto })
  @ApiResponse({ status: 200, description: '修改成功，返回更新后的购物车项详情' })
  @ApiResponse({ status: 400, description: '参数校验失败，如 quantity 小于 1' })
  @ApiResponse({ status: 404, description: '购物车项不存在，传入的 id 未在购物车表中找到' })
  updateQuantity(@Param('id') id: string, @Body() dto: UpdateCartDto) {
    return this.cartService.updateQuantity(id, dto.quantity);
  }

  @Delete(':id')
  @ApiOperation({
    summary: '将商品移出购物车',
    description: '从购物车中删除指定商品。删除后不可恢复，需重新加入购物车。即使该商品已下架也可以正常删除。',
  })
  @ApiParam({ name: 'id', description: '购物车项ID，即 CartItem 的唯一标识', example: 'cart-item-1' })
  @ApiResponse({ status: 200, description: '删除成功，返回被删除的购物车项信息' })
  @ApiResponse({ status: 404, description: '购物车项不存在，传入的 id 未在购物车表中找到' })
  removeFromCart(@Param('id') id: string) {
    return this.cartService.removeFromCart(id);
  }
}
