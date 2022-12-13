import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { handleError } from 'src/utils/handle-error.util';


@Injectable()
export class UserService {
  isAdmin: any;
  constructor(private readonly prisma: PrismaService) {}

  private userSelect = {
    id: true,
    name: true,
    email: true,
    image: true,
    password: false,
    cpf: true,
    isAdmin: true,
    createdAt: true,
    updatedAt: true,
  };

  async findAll(){
    return await this.prisma.user.findMany({
      select: this.userSelect,
    });
  }

  async findById(id: string){
    const data = await this.prisma.user.findUnique({
      where: { id },
      select: this.userSelect,
    });
    if (!data) {
      throw new NotFoundException(`Registro com o ID '${id}' não encontrado.`);
    }
    return data;
  }

  async create(dto: CreateUserDto) {
    if (dto.password != dto.confirmPassword) {
      throw new BadRequestException('As senhas informadas não são iguais.');
    }
    delete dto.confirmPassword;
    const data: User = {
      ...dto,
      password: await bcrypt.hash(dto.password, 10),
    };
    return this.prisma.user
      .create({
        data,
        select: this.userSelect,
      })
      .catch(handleError);
  }

  async update(user: User, id: string, dto: UpdateUserDto){
    if (this.isAdmin) {
      await this.findById(id);

      if (dto.cpf) {
        throw new BadRequestException('Não é possível alterar o CPF do usuário');
      }
      if (dto.password) {
        if (dto.password != dto.confirmPassword) {
          throw new BadRequestException('As senhas informadas não são iguais.');
        }
      }
      delete dto.confirmPassword;
      const data: Partial<User> = { ...dto };
      if (data.password) {
        data.password = await bcrypt.hash(data.password, 10);
      }
      return this.prisma.user.update({
        where: { id },
        data,
        select: this.userSelect,
      });

    }else{
      throw new UnauthorizedException(
        'Usuário não autorizado. Contate o Administrador!',
      );
    }

  }

  async delete(id: string) {
    await this.findById(id);
    await this.prisma.user.delete({ where: { id:id } });
  }
}
