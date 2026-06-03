import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendMessageDto {
  @ApiProperty({ description: '接收者用户ID。在 C 端场景中通常是商家的用户ID，可通过会话列表获取', example: 'merchant-user-1' })
  @IsString()
  receiverId: string;

  @ApiProperty({ description: '消息文本内容', example: '你好，请问皇家幼犬粮有货吗？' })
  @IsString()
  content: string;
}
