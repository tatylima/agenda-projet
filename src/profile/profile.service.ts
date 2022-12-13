import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/user/entities/user.entity';
import { handleError } from 'src/utils/handle-error.util';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(user: User) {
    return this.prisma.profile.findMany({
      where: {
        userId: user.id,
      },
      include: {
        user: true,
        game: true,
        favproducts: {
          select: {
            product: {
              select: {
                title: true,
              },
            },
          },
        },
      },
    });
  }

  async findById(id: string) {
    const record = await this.prisma.profile.findUnique({
      where: { id: id },
      include: {
        product: true,
      },
    });

    if (!record) {
      throw new NotFoundException(`Registro com o ID: '${id}' não encontrado`);
    }
    return record;
  }

  async create(userId: string, dto: CreateProfileDto) {
    if (dto.productId) {
      return await this.prisma.profile
        .create({
          data: {
            name: dto.name,
            image: dto.image,
            userId: dto.userId,
            product: {
              connect: {
                id: dto.productId,
              },
            },
          },
          include: {
          product: true,
            favproduct: true,
          },
        })
        .catch(handleError);
    } else {
      return await this.prisma.profile
        .create({
          data: {
            name: dto.name,
            image: dto.image,
            userId: dto.userId,
          },
          include: {
            favproduct: true,
          },
        })
        .catch(handleError);
    }
  }

  async update(userId: string, id: string, dto: UpdateProfileDto) {
    await this.findById(id);
    if (dto.productId) {
      return this.prisma.profile
        .update({
          where: { id },
          data: {
            name: dto.name,
            image: dto.image,
            userId: userId,
            favproduct: {
              connect: {
                id: dto.productId,
              },
            },
          },
          include: { favgames: true },
        })
        .catch(handleError);
    } else {
      return this.prisma.profile
        .update({
          where: { id },
          data: {
            name: dto.name,
            image: dto.image,
            userId: userId,
          },
          include: { favgames: true },
        })
        .catch(handleError);
    }
  }

  async delete(user: User, id: string) {
    if (user.isAdmin) {
      await this.findById(id);
      await this.prisma.profile.delete({ where: { id } });
    } else {
      throw new UnauthorizedException(
        'Usuário não autorizado. Contate o Administrador!',
      );
    }
  }
}
