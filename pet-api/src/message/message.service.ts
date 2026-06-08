import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) {}

  async getConversations(userId: string) {
    const messages = await this.prisma.message.findMany({
      where: { OR: [{ senderId: userId }, { receiverId: userId }] },
      include: {
        sender: { include: { merchants: true } },
        receiver: { include: { merchants: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    const grouped = new Map<
      string,
      {
        merchantId: string;
        merchantName: string;
        merchantLogo: string | null;
        lastMessage: string;
        lastMessageTime: Date;
        unreadCount: number;
        messages: typeof messages;
      }
    >();

    for (const msg of messages) {
      const isSender = msg.senderId === userId;
      const otherUser = isSender ? msg.receiver : msg.sender;
      const merchant = otherUser.merchants[0];
      if (!merchant) continue;

      const key = merchant.id;
      if (!grouped.has(key)) {
        grouped.set(key, {
          merchantId: merchant.id,
          merchantName: merchant.name,
          merchantLogo: merchant.logo,
          lastMessage: msg.content,
          lastMessageTime: msg.createdAt,
          unreadCount: 0,
          messages: [],
        });
      }

      const conv = grouped.get(key)!;
      conv.messages.push(msg);
      // 未读：对方发的 + 未标记已读
      if (!isSender && !msg.readAt) conv.unreadCount++;
    }

    return Array.from(grouped.values());
  }

  async getNotifications(userId: string) {
    return this.prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async markMessageAsRead(id: string, userId: string) {
    const msg = await this.prisma.message.findFirst({
      where: { id, receiverId: userId },
    });
    if (!msg) throw new NotFoundException('消息不存在');

    return this.prisma.message.update({
      where: { id },
      data: { readAt: new Date() },
    });
  }

  async markNotificationAsRead(id: string, userId: string) {
    const notif = await this.prisma.notification.findFirst({
      where: { id, userId },
    });
    if (!notif) throw new NotFoundException('通知不存在');

    return this.prisma.notification.update({
      where: { id },
      data: { isRead: true },
    });
  }

  async markAllNotificationsAsRead(userId: string) {
    await this.prisma.notification.updateMany({
      where: { userId, isRead: false },
      data: { isRead: true },
    });
    return { success: true };
  }

  async getUnreadCount(userId: string) {
    const [messageCount, notificationCount] = await Promise.all([
      this.prisma.message.count({
        where: { receiverId: userId, readAt: null },
      }),
      this.prisma.notification.count({
        where: { userId, isRead: false },
      }),
    ]);
    return { messageCount, notificationCount };
  }

  async deleteConversation(userId: string, merchantId: string) {
    // 找到商家对应的用户
    const merchant = await this.prisma.merchant.findUnique({
      where: { id: merchantId },
      select: { userId: true },
    });
    if (!merchant) throw new NotFoundException('商家不存在');

    const otherUserId = merchant.userId;

    await this.prisma.message.deleteMany({
      where: {
        OR: [
          { senderId: userId, receiverId: otherUserId },
          { senderId: otherUserId, receiverId: userId },
        ],
      },
    });

    return { success: true };
  }

  async sendMessage(senderId: string, receiverId: string, content: string) {
    return this.prisma.message.create({
      data: { senderId, receiverId, content },
    });
  }
}
