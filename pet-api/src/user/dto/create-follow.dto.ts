import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFollowDto {
  @ApiProperty({ description: '要关注的店铺商家ID。同一店铺不可重复关注，重复调用会直接返回已有记录', example: 'merchant-1' })
  @IsString()
  merchantId: string;
}
