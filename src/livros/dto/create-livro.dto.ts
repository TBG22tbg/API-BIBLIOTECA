import { IsBoolean, IsInt, IsNotEmpty, IsString, Max } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateLivroDto {
    @IsString() // Tem que ser string
    @IsNotEmpty() // Não pode estar vazio
    // ApiProperty serve para informar um exemplo de preenchimento para este campo.
    @ApiProperty({
        example: 'Dom Casmurro',
        description: 'Título do livro'
    })
    titulo: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: 'Machado de Assis',
        description: 'Autor do livro'
    })
    autor: string;

    @IsInt() // Tem que ser número inteiro
    @Max(2100, {message: 'O ano deve ser menor ou igual a 2100'}) // Valor máximo
    @ApiProperty({
        example: 1800,
        description: 'Ano de publicação do livro'
    })
    ano: number;

    @IsBoolean() // O valor é boleano
    @ApiProperty({
        example: true,
        description: 'Disponibilidade do livro'
    })
    disponivel: boolean;
}