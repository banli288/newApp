import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { UserLogisticsService } from './user-logistics.service';

const DEFAULT_USER_ID = 'default-user';

@ApiTags('我的-物流')
@Controller('user/orders')
export class UserLogisticsController {
  constructor(private readonly service: UserLogisticsService) {}

  @Get(':id/logistics')
  @ApiOperation({
    summary: '获取订单物流信息',
    description: '返回指定订单的物流时间线，包含快递单号、快递公司和物流事件列表（按时间正序）。物流事件含状态、地点和描述。',
  })
  @ApiParam({ name: 'id', description: '订单ID', example: 'order-1' })
  @ApiResponse({ status: 200, description: '返回 { trackingNo, carrier, status, events: [...] }' })
  @ApiResponse({ status: 404, description: '订单不存在' })
  getLogistics(@Param('id') id: string) {
    return this.service.getLogistics(id, DEFAULT_USER_ID);
  }
}
