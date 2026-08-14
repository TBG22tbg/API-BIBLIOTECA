import { IsOptional, IsString, IsInt, IsBoolean } from "class-validator";

export class updateLivroDto {
    // Deve ser uma string e o campo não precisa ser enviado na atualização
    // Mas caso ele seja enviado, precisará ser uma string
    @IsString()
    @IsOptional()
    titulo?: string;

    @IsString()
    @IsOptional()
    autor?: string;

    // Deve ser uma número e o campo não precisa ser enviado na atualização
    // Mas caso ele seja enviado, precisará ser um numero inteiro.
    @IsOptional()
    @IsInt()
    ano?: number;

    // Deve ser booleano e o campo não precisa ser enviado na atualização
    // Mas caso ele seja enviado, precisará ser true ou false.
    @IsOptional()
    @IsBoolean()
    disponivel?: boolean;
}