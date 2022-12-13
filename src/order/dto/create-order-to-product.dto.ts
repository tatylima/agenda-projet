import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive, IsUUID } from 'class-validator';

export class CreateOrderToProctDto {
  @ApiProperty({
    description: 'id for product',
    example: '3755c7c0-b6a4-4d46-8590-9970073f6eb6',
  })
  @IsUUID()
  productId: string;

  @ApiProperty({
    description: 'quantity for product',
    example: '2',
  })
  @IsInt()
  @IsPositive()
  quantity: number;
}
