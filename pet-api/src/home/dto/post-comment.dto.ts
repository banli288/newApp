import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostCommentDto {
  @ApiProperty({ description: '评论内容', example: '太可爱了！' })
  @IsString()
  content: string;
}
