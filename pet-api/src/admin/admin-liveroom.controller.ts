import { Controller, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { AdminLiveRoomService } from './admin-liveroom.service';
import { CreateLiveRoomDto } from './dto/create-liveroom.dto';
import { UpdateLiveRoomDto } from './dto/update-liveroom.dto';

@ApiTags('后台-直播间管理')
@Controller('admin/live-rooms')
export class AdminLiveRoomController {
  constructor(private readonly service: AdminLiveRoomService) {}

  @Post()
  @ApiOperation({
    summary: '创建直播间',
    description: '后台新增一个直播间。需提供封面图URL、标题和所属商家ID。系统会校验 merchantId 是否存在。直播间创建后即可在首页展示。',
  })
  @ApiBody({ type: CreateLiveRoomDto })
  @ApiResponse({ status: 201, description: '创建成功，返回直播间详情（含自动生成的ID和商家信息）' })
  @ApiResponse({ status: 400, description: '参数校验失败，如标题或封面图为空' })
  @ApiResponse({ status: 404, description: '商家不存在，merchantId 在商家表中未找到' })
  create(@Body() dto: CreateLiveRoomDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: '更新直播间',
    description: '修改指定直播间的信息，所有字段均为可选。可更新封面图、标题和所属商家。修改后首页实时生效。',
  })
  @ApiParam({ name: 'id', description: '直播间ID', example: 'live-1' })
  @ApiBody({ type: UpdateLiveRoomDto })
  @ApiResponse({ status: 200, description: '更新成功，返回更新后的直播间详情' })
  @ApiResponse({ status: 400, description: '参数校验失败' })
  @ApiResponse({ status: 404, description: '直播间不存在' })
  update(@Param('id') id: string, @Body() dto: UpdateLiveRoomDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: '删除直播间',
    description: '永久删除指定直播间。删除后首页将不再展示该直播间入口。此操作不可恢复。',
  })
  @ApiParam({ name: 'id', description: '直播间ID', example: 'live-1' })
  @ApiResponse({ status: 200, description: '删除成功，返回被删除的直播间信息' })
  @ApiResponse({ status: 404, description: '直播间不存在' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
