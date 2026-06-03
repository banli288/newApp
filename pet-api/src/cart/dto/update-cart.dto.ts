import { IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCartDto {
  @ApiProperty({ description: '修改后的商品数量，最小为1。若要删除商品请使用 DELETE 接口', example: 3 })
  @IsInt()
  @Min(1)
  quantity: number;
}
