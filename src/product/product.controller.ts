import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger'; // < NOVO IMPORT

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiOperation({   // < TAGS DO SWAGGER
    summary: 'Criar um produto',
  })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  @ApiOperation({   // < TAGS DO SWAGGER
    summary: 'Listar todos os produtos',
  })
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  @ApiOperation({   // < TAGS DO SWAGGER
    summary: 'Visualizar um produto pelo ID',
  })
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({   // < TAGS DO SWAGGER
    summary: 'Editar um produto pelo ID',
  })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  //@HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({    // < TAGS DO SWAGGER
    summary: 'Remover um produto pelo ID',
  })
  delete(@Param('id') id: string) {
    this.productService.delete(id);
  }
}
