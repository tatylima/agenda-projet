import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsUUID, ValidateNested } from 'class-validator';
import { CreateOrderProductDto } from 'src/product/dto/create-product.dto';

export class CreateOrderDto {
  @IsUUID()
  @ApiProperty({
    description: 'ID do usuário que está criando o pedido',
    example: 'e1bc0c89-a319-44df-a6e9-db66fe7b956b',
  })
  userId: string;

  @ValidateNested({
    each: true,
  })
  @Type(() => CreateOrderProductDto)
  @ApiProperty({
    description: 'Lista com os IDs dos produtos que estão no pedido',
    type: [CreateOrderProductDto],
  })
  products: CreateOrderProductDto[];
}
