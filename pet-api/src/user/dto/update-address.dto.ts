import { IsString, IsBoolean, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateAddressDto {
  @ApiPropertyOptional({ description: '收货人真实姓名', example: '李四' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: '收货人手机号码', example: '13900139002' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ description: '详细收货地址', example: '广东省珠海市香洲区情侣中路128号 海景花园A座1801' })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({ description: '是否设为默认地址。设为 true 时，该用户的其他地址会自动取消默认', example: true })
  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;
}
