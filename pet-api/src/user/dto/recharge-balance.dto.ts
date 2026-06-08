import { IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RechargeBalanceDto {
  @ApiProperty({ description: '充值金额，单位为元，最小0.01', example: 100.00 })
  @IsNumber()
  @Min(0.01)
  amount: number;
}
