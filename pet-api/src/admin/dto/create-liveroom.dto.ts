import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLiveRoomDto {
  @ApiProperty({ description: '直播间封面图片URL，建议使用16:9横版图片', example: 'https://picsum.photos/id/237/200/300' })
  @IsString()
  coverImage: string;

  @ApiProperty({ description: '直播间标题，展示在首页直播入口', example: '萌宠好物分享——今日特惠专场' })
  @IsString()
  title: string;

  @ApiProperty({ description: '商家ID，标识直播间所属商家。可通过种子数据中的 merchant-1、merchant-2、merchant-3 查看', example: 'merchant-1' })
  @IsString()
  merchantId: string;
}
