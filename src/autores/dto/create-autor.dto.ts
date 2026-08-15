import { IsInt, IsNotEmpty, IsString, Max, Min } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class CreateAutorDto {
  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional({
        example: 'Machado de Assis',
        description: 'Autor com grandes obras na literatura brasileira'
    })
  autor: string;

  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional({
        example: 'Brasileiro',
        description: 'Autor brasileiro reconhecido por suas grandes obras literarias'
    })
  nacionalidade: string;

  @IsInt()
  @Min(0, { message: 'O ano não pode ser negativo' })
  @Max(2100, { message: 'O ano deve ser menor ou igual a 2100' })
  @ApiPropertyOptional({
        example: 1839,
        description: 'Ano em que nasceu Machado de Assis'
    })
  ano_nascimento: number;
}