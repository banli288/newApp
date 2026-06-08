import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { MessageService } from './message.service';
import { SendMessageDto } from './dto/send-message.dto';

const DEFAULT_USER_ID = 'default-user';

@ApiTags('消息')
@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get('list')
  @ApiOperation({
    summary: '获取会话列表（按商家分组）',
    description: '返回当前用户与各商家的私信会话列表，按最后一条消息时间倒序排列。未读数基于 readAt 字段精确计算。',
  })
  @ApiResponse({ status: 200, description: '成功返回会话列表' })
  getConversations() {
    return this.messageService.getConversations(DEFAULT_USER_ID);
  }

  @Get('notifications')
  @ApiOperation({
    summary: '获取系统通知列表',
    description: '返回当前用户收到的系统通知，按时间倒序排列。每条通知含 isRead 字段标识是否已读。',
  })
  @ApiResponse({ status: 200, description: '成功返回通知列表' })
  getNotifications() {
    return this.messageService.getNotifications(DEFAULT_USER_ID);
  }

  // ==================== 未读数量 ====================

  @Get('unread-count')
  @ApiOperation({
    summary: '获取未读数量统计',
    description: '返回消息未读数和通知未读数，用于 Tab 角标显示。',
  })
  @ApiResponse({ status: 200, description: '返回 { messageCount, notificationCount }' })
  getUnreadCount() {
    return this.messageService.getUnreadCount(DEFAULT_USER_ID);
  }

  // ==================== 消息已读 ====================

  @Patch(':id/read')
  @ApiOperation({
    summary: '标记消息已读',
    description: '将指定消息标记为已读（设置 readAt 时间戳）。只能标记自己收到的消息。',
  })
  @ApiParam({ name: 'id', description: '消息ID', example: 'msg-1' })
  @ApiResponse({ status: 200, description: '标记成功，返回更新后的消息' })
  @ApiResponse({ status: 404, description: '消息不存在，或不属于当前用户' })
  markMessageAsRead(@Param('id') id: string) {
    return this.messageService.markMessageAsRead(id, DEFAULT_USER_ID);
  }

  // ==================== 通知已读 ====================

  @Patch('notifications/:id/read')
  @ApiOperation({
    summary: '标记通知已读',
    description: '将指定通知标记为已读。',
  })
  @ApiParam({ name: 'id', description: '通知ID', example: 'notif-1' })
  @ApiResponse({ status: 200, description: '标记成功' })
  @ApiResponse({ status: 404, description: '通知不存在' })
  markNotificationAsRead(@Param('id') id: string) {
    return this.messageService.markNotificationAsRead(id, DEFAULT_USER_ID);
  }

  @Patch('notifications/read-all')
  @ApiOperation({
    summary: '批量标记所有通知已读',
    description: '将当前用户的所有未读通知标记为已读。',
  })
  @ApiResponse({ status: 200, description: '返回 { success: true }' })
  markAllNotificationsAsRead() {
    return this.messageService.markAllNotificationsAsRead(DEFAULT_USER_ID);
  }

  // ==================== 删除会话 ====================

  @Delete('conversations/:merchantId')
  @ApiOperation({
    summary: '删除与商家的会话',
    description: '删除当前用户与指定商家的所有私信记录。删除后不可恢复。',
  })
  @ApiParam({ name: 'merchantId', description: '商家ID', example: 'merchant-1' })
  @ApiResponse({ status: 200, description: '返回 { success: true }' })
  @ApiResponse({ status: 404, description: '商家不存在' })
  deleteConversation(@Param('merchantId') merchantId: string) {
    return this.messageService.deleteConversation(DEFAULT_USER_ID, merchantId);
  }

  // ==================== 发送消息 ====================

  @Post()
  @ApiOperation({
    summary: '发送私信',
    description: '向指定用户发送一条文字消息。',
  })
  @ApiBody({ type: SendMessageDto })
  @ApiResponse({ status: 201, description: '发送成功，返回消息详情' })
  @ApiResponse({ status: 400, description: '参数校验失败' })
  @ApiResponse({ status: 404, description: '接收者不存在' })
  sendMessage(@Body() dto: SendMessageDto) {
    return this.messageService.sendMessage(DEFAULT_USER_ID, dto.receiverId, dto.content);
  }
}
