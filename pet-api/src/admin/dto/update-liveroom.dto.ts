import { IsString, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateLiveRoomDto {
  @ApiPropertyOptional({ description: '直播间封面图片URL，建议使用16:9横版图片', example: 'https://picsum.photos/id/237/200/300' })
  @IsOptional()
  @IsString()
  coverImage?: string;

  @ApiPropertyOptional({ description: '直播间标题', example: '萌宠好物分享——晚间加场' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ description: '商家ID，变更直播间所属商家', example: 'merchant-2' })
  @IsOptional()
  @IsString()
  merchantId?: string;
}
