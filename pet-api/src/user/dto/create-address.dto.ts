import { IsString, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAddressDto {
  @ApiProperty({ description: '收货人真实姓名', example: '张三' })
  @IsString()
  name: string;

  @ApiProperty({ description: '收货人手机号码', example: '13800138001' })
  @IsString()
  phone: string;

  @ApiProperty({ description: '详细收货地址，包含省市区街道门牌号', example: '湖南省湘潭市雨湖区建设路88号 幸福小区3栋502' })
  @IsString()
  address: string;

  @ApiPropertyOptional({ description: '是否设为默认地址。设为 true 时，该用户的其他地址会自动取消默认', example: false, default: false })
  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;
}
