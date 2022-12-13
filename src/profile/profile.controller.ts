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
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { User } from 'src/user/entities/user.entity';

@ApiTags('profile')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  @ApiOperation({
    summary: 'Listar todos os perfis',
  })
  findAll(@LoggedUser() user: User) {
    return this.profileService.findAll(user);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Visualizar um Perfil pelo ID',
  })
  findById(@Param('id') id: string) {
    return this.profileService.findById(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Criar um novo Perfil',
  })
  create(@LoggedUser() user: User, @Body() dto: CreateProfileDto) {
    return this.profileService.create(user.id, dto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Editar um Perfil pelo ID',
  })
  update(
    @LoggedUser() user: User,
    @Param('id') id: string,
    @Body() dto: UpdateProfileDto,
  ) {
    return this.profileService.update(user.id, id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Deletar um Perfil pelo ID',
  })
  delete(@LoggedUser() user: User, @Param('id') id: string) {
    return this.profileService.delete(user, id);
  }
}
