import { Injectable } from '@nestjs/common';
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
      if (!isSender) conv.unreadCount++;
    }

    return Array.from(grouped.values());
  }

  async getNotifications(userId: string) {
    return this.prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async sendMessage(senderId: string, receiverId: string, content: string) {
    return this.prisma.message.create({
      data: { senderId, receiverId, content },
    });
  }
}
