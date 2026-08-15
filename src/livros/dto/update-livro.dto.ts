import { IsOptional, IsString, IsInt, IsBoolean } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class updateLivroDto {
    // Deve ser uma string e o campo não precisa ser enviado na atualização
    // Mas caso ele seja enviado, precisará ser uma string
    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        example: 'Dom Casmurro 2',
        description: 'Novo titulo para o livro'
    })
    titulo?: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        example: 'Machado de Assis 2',
        description: 'Novo autor do livro'
    })
    autor?: string;

    // Deve ser uma número e o campo não precisa ser enviado na atualização
    // Mas caso ele seja enviado, precisará ser um numero inteiro.
    @IsOptional()
    @IsInt()
    @ApiPropertyOptional({
        example: 1900,
        description: 'Novo ano de publicação'
    })
    ano?: number;

    // Deve ser booleano e o campo não precisa ser enviado na atualização
    // Mas caso ele seja enviado, precisará ser true ou false.
    @IsOptional()
    @IsBoolean()
    @ApiPropertyOptional({
        example: false,
        description: 'Nova disponibilidade do livro'
    })
    disponivel?: boolean;
}