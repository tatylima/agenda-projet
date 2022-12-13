import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: { nickname: string }) {
    const user = await this.prisma.user.findUnique({
      where: { nickname: payload.nickname },
    });

    if (!user) {
      throw new UnauthorizedException(
        'Usuário não existe ou não está autenticado',
      );
    }

    delete user.password;

    return user;
  }
}

/*Criar a classe JwtStrategy e estendê-la do PassportStrategy passando como parâmetro o Strategy do passport-jwt
Passar o @Injectable acima da classe
Chamar o PrismaService no constructor
Dentro do constructor criar um método super passando:
a estratégia de extração do token
a opção de não ignorar a expiração
e a chave secreta
Criar o método async validate dentro do JwtStrategy passando como parâmetro um payload do tipo nickname
Buscar o usuário no banco de dados com o await e findUnique informando o nickname
Validar se encontrou um usuário
Deletar a senha do usuário para não aparecer no retorno
Passar o usuário no return*/
