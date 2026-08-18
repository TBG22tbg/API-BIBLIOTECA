import { IsString, IsNotEmpty, IsEmail } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class CreateUsuarioDto {
    @IsString()
    @IsNotEmpty()
    @ApiPropertyOptional({
        example: 'Tarcísio',
        description: 'Nome do usuario cadastrado no sistema'
    })
    nome: string;

    @IsEmail()
    @IsNotEmpty()
    @ApiPropertyOptional({
        example: 'tarcisio@gamail.com',
        description: 'Email do usuario cadastrado no sistema'
    })
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiPropertyOptional({
        example: 'Crie sua senha',
        description: 'Criação da senha pelo usuário'
    })
    senha: string;
}