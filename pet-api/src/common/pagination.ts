import { IsOptional, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationQuery {
  @ApiPropertyOptional({ description: '页码，从1开始。用于分页查询时指定当前请求第几页的数据', default: 1, example: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page?: number = 1;

  @ApiPropertyOptional({ description: '每页条数，控制单次返回的数据量。建议不超过50条以保证响应速度', default: 10, example: 10 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  limit?: number = 10;
}

export function paginationParams(query: PaginationQuery) {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  return {
    skip: (page - 1) * limit,
    take: limit,
    page,
    limit,
  };
}

export function paginatedResponse(items: any[], total: number, page: number, limit: number) {
  return { items, total, page, limit };
}
