import { IsNotEmpty, IsString, IsInt } from "class-validator";

export class updateAutorDto {

    @IsNotEmpty()
    @IsString()
    autor?: string;

    @IsNotEmpty()
    @IsString()
    nacionalidade?: string;

    @IsNotEmpty()
    @IsInt()
    ano_nascimento?: number;
}