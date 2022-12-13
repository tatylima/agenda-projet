import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUrl,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Nome de usuário. Apenas para exibição',
    example: 'Tatiana Lima',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'CPF do usuário',
    example: '123.456.789-29',
  })
  cpf: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'E-mail para cadastro do usuário.',
    example: 'tatianalima@gmail.com',
  })
  email: string;

  @IsString()
  @MinLength(6)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Senha muito fraca',
  })
  @ApiProperty({
    description: 'Senha do usuário',
    example: 'Abcd@1234',
  })
  password: string;

  @IsString()
  @ApiProperty({
    description: 'A confirmação da senha deve ser igual a senha',
    example: 'Abcd@1234',
  })
  confirmPassword: string;

  @IsUrl()
  @ApiProperty({
    description: 'Imagem de perfil do usuário',
    example: 'https://avatars.githubusercontent.com/u/97984721?s=400&u=c611aadf5b37eadeb851c125d233ad670af240a4&v=4',
  })
  image: string;

  isAdmin: boolean;
}
