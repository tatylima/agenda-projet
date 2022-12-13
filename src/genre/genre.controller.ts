import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GenreService } from './genre.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { Genre } from './entities/genre.entity';

@ApiTags('genre')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('genre')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  Post();
  @ApiOperation({
    summary: 'Registrar um novo genero',
  })
  create(
    @LoggedUser() user: User,
    @Body() dto: CreateGenreDto,
  ): Promise<Genre> {
    return this.genreService.create(user, dto);
  }
  @Get()
  @ApiOperation({
    summary: 'Listar todos os generos',
  })
  findAll(): Promise<Genre[]> {
    return this.genreService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Visualizar um genre pelo seu ID',
  })
  findById(@Param('id') id: string): Promise<Genre> {
    return this.genreService.findById(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Editar um genre pelo seu ID',
  })
  update(
    @LoggedUser() user: User,
    @Param('id') id: string,
    @Body() dto: UpdateGenreDto,
  ): Promise<Genre> {
    return this.genre.update(id, dto, user);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Remover um genre pelo seu ID',
  })
  delete(@LoggedUser() user: User, @Param('id') id: string) {
    this.genreService.delete(user, id);
  }
}
