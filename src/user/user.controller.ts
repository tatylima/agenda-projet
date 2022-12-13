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
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { User } from './entities/user.entity';
import { LoggedUser } from 'src/auth/logged-user.decorator';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({
    summary: 'Criar um usuário',
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  /* GET / GETBYID , UPDATE & DELETE VIA AUTENTICAÇÃO */
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Get()
  @ApiOperation({
    summary: 'Listar todos os usuários',
  })
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Get(':id')
  @ApiOperation({
    summary: 'Visualizar um usuário pelo ID',
  })
  findById(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({
    summary: 'Editar um usuário pelo ID',
  })
  update(@LoggedUser() user: User,@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(user, id, updateUserDto);
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Deletar um usuário pelo ID',
  })
  delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
