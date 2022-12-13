import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGenreDto {
  @ApiProperty({
    description: 'genero do produto',
    example: 'agendas femininas',
  })
  @IsString()
  @IsNotEmpty()
  genre: string;
}
