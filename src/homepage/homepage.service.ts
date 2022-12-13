import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HomepageService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(id: string) {
    const profileData = await this.prisma.profile.findUnique({
      where: { id: id },
      /* SELECIONAR O PERFIL E USUÁRIO "RESPONSÁVEL" */
      select: {
        name: true,
        image: true,
        user: {
          select: {
            name: true,
            isAdmin: true,
          },
        },
        /* EXIBIR OS JOGOS DESTE PERFIL, ASSIM COMO SEU RESPECTIVO GÊNERO */
        product: {
          select: {
            title: true,
            image: true,
            genre: {
              select: {
                genre: true,
              },
            },
          },
        },
        favproduct: {
          select: {
            product: true,
          },
        },
      },
    });

    /* EXIBIR TODOS OS GÊNEROS */
    const allGenres = await this.prisma.genre.findMany({
      select: {
        genre: true,
        product: {
          select: {
            title: true,
            image: true,
          },
        },
      },
    });
    return { profileData, allGenres };
  }
}
