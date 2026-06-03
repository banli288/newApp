import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
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
    description: '返回当前用户与各商家的私信会话列表，按最后一条消息时间倒序排列。每个会话包含商家头像和名称、最后一条消息预览、未读消息数、以及该会话的完整消息列表（按时间正序）。用于「消息中心」页面。',
  })
  @ApiResponse({ status: 200, description: '成功返回会话列表。每项含 merchant（商家信息）、lastMessage（最后一条消息）、unreadCount（未读数）、messages（消息数组）' })
  @ApiResponse({ status: 404, description: '用户不存在' })
  getConversations() {
    return this.messageService.getConversations(DEFAULT_USER_ID);
  }

  @Get('notifications')
  @ApiOperation({
    summary: '获取系统通知列表',
    description: '返回当前用户收到的系统通知，按时间倒序排列。通知类型包括订单状态变更、活动提醒等。每条通知含标题、内容和创建时间。',
  })
  @ApiResponse({ status: 200, description: '成功返回通知列表，每项含 id、title、content、createdAt 等字段' })
  @ApiResponse({ status: 404, description: '用户不存在' })
  getNotifications() {
    return this.messageService.getNotifications(DEFAULT_USER_ID);
  }

  @Post()
  @ApiOperation({
    summary: '发送私信',
    description: '向指定商家发送一条文字消息。receiverId 为商家的用户ID，可通过会话列表或商家详情获取。发送成功后消息会自动出现在双方的会话中。',
  })
  @ApiBody({ type: SendMessageDto })
  @ApiResponse({ status: 201, description: '发送成功，返回消息详情（含消息ID、发送时间、发送者和接收者信息）' })
  @ApiResponse({ status: 400, description: '参数校验失败，如 receiverId 或 content 为空' })
  @ApiResponse({ status: 404, description: '接收者不存在，receiverId 在用户表中未找到' })
  sendMessage(@Body() dto: SendMessageDto) {
    return this.messageService.sendMessage(DEFAULT_USER_ID, dto.receiverId, dto.content);
  }
}
