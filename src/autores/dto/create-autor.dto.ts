import { IsInt, IsNotEmpty, IsString, Max, Min } from "class-validator";

export class CreateAutorDto {
  @IsString()
  @IsNotEmpty()
  autor: string;

  @IsString()
  @IsNotEmpty()
  nacionalidade: string;

  @IsInt()
  @Min(0, { message: 'O ano não pode ser negativo' })
  @Max(2100, { message: 'O ano deve ser menor ou igual a 2100' })
  ano_nascimento: number;
}