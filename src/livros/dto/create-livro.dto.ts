import { IsBoolean, IsInt, IsNotEmpty, IsString, Max, Min } from "class-validator";

export class CreateLivroDto {
    @IsString() // Tem que ser string
    @IsNotEmpty() // Não pode estar vazio
    titulo: string;
    @IsString()
    @IsNotEmpty()
    autor: string;
    @IsInt() // Tem que ser número inteiro
    @Max(2100, {message: 'O ano deve ser menor ou igual a 2100'}) // Valor máximo
    ano: number;
    @IsBoolean() // O valor é boleano
    disponivel: boolean;
}