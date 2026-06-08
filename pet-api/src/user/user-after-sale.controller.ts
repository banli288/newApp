import { Controller, Get, Post, Patch, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';
import { UserAfterSaleService } from './user-after-sale.service';
import { PaginationQuery } from '../common/pagination';
import { IsString, IsNumber, IsOptional, IsArray } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

const DEFAULT_USER_ID = 'default-user';

class CreateAfterSaleDto {
  @ApiProperty({ description: '订单ID', example: 'order-1' })
  @IsString()
  orderId: string;

  @ApiProperty({ description: '售后类型：refund（仅退款）/ return_refund（退货退款）', example: 'refund', enum: ['refund', 'return_refund'] })
  @IsString()
  type: string;

  @ApiProperty({ description: '申请原因', example: '商品质量问题' })
  @IsString()
  reason: string;

  @ApiPropertyOptional({ description: '凭证图片URL数组', type: [String] })
  @IsOptional()
  @IsArray()
  images?: string[];

  @ApiProperty({ description: '退款金额', example: 128.0 })
  @IsNumber()
  refundAmount: number;
}

class SubmitReturnShippingDto {
  @ApiProperty({ description: '快递单号', example: 'SF9876543210' })
  @IsString()
  trackingNo: string;

  @ApiProperty({ description: '快递公司', example: '顺丰速运' })
  @IsString()
  carrier: string;
}

@ApiTags('售后服务')
@Controller('user/after-sales')
export class UserAfterSaleController {
  constructor(private readonly service: UserAfterSaleService) {}

  @Post()
  @ApiOperation({
    summary: '申请售后',
    description: '提交退款或退货退款申请。仅退款需订单状态为 paid（未发货），退货退款需订单状态为 completed（已收货）。审核通过后自动退款。',
  })
  @ApiBody({ type: CreateAfterSaleDto })
  @ApiResponse({ status: 201, description: '申请成功，返回售后记录' })
  @ApiResponse({ status: 400, description: '订单状态不支持该售后类型、金额不合法等' })
  @ApiResponse({ status: 404, description: '订单不存在' })
  createAfterSale(@Body() dto: CreateAfterSaleDto) {
    return this.service.createAfterSale(DEFAULT_USER_ID, dto);
  }

  @Get()
  @ApiOperation({
    summary: '我的售后列表',
    description: '返回当前用户的售后申请列表，支持按状态筛选。返回 { items, total, page, limit }。',
  })
  @ApiQuery({ name: 'status', required: false, description: '状态筛选：pending/approved/rejected/returning/completed', example: 'pending' })
  @ApiQuery({ name: 'page', required: false, description: '页码', example: 1 })
  @ApiQuery({ name: 'limit', required: false, description: '每页条数', example: 10 })
  @ApiResponse({ status: 200, description: '成功返回售后列表' })
  getAfterSales(
    @Query('status') status: string,
    @Query() query: PaginationQuery,
  ) {
    return this.service.getAfterSales(DEFAULT_USER_ID, status, query);
  }

  @Get(':id')
  @ApiOperation({
    summary: '售后详情',
    description: '返回售后申请的完整详情，包含订单信息、商品信息和售后进度时间轴。',
  })
  @ApiParam({ name: 'id', description: '售后记录ID', example: 'as-1' })
  @ApiResponse({ status: 200, description: '返回售后详情（含 order、logs 时间轴）' })
  @ApiResponse({ status: 404, description: '售后记录不存在' })
  getAfterSaleDetail(@Param('id') id: string) {
    return this.service.getAfterSaleDetail(id, DEFAULT_USER_ID);
  }

  @Patch(':id/return')
  @ApiOperation({
    summary: '提交退货物流',
    description: '退货退款审核通过后，提交退货快递单号和快递公司。状态从 approved 变为 returning。',
  })
  @ApiParam({ name: 'id', description: '售后记录ID', example: 'as-1' })
  @ApiBody({ type: SubmitReturnShippingDto })
  @ApiResponse({ status: 200, description: '提交成功，状态更新为 returning' })
  @ApiResponse({ status: 400, description: '当前状态不允许提交退货物流' })
  @ApiResponse({ status: 404, description: '售后记录不存在' })
  submitReturnShipping(@Param('id') id: string, @Body() dto: SubmitReturnShippingDto) {
    return this.service.submitReturnShipping(id, DEFAULT_USER_ID, dto);
  }
}
