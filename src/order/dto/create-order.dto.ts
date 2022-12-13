import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsUUID, ValidateNested } from 'class-validator';
import { CreateOrderToProctDto } from './create-order-to-product.dto';

export class CreateOrderDto {
  @ApiProperty({
    description: 'user id, used to identify',
    example: '79afc834-9485-46bd-8f0b-61c7007fc128',
  })
  @IsUUID()
  userId: string;

  @ApiProperty({
    description: 'product array with all selected and quantity the products',
    example: '[ { id: 79afc834-9485-46bd-8f0b-61c7007fc128, quantity: 1} ]',
  })
  @ValidateNested({ each: true })
  @Type(() => CreateOrderToProctDto)
  products: CreateOrderToProctDto[];
}
