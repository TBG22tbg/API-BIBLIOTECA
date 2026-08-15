import { IsOptional, IsString, IsInt } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class updateAutorDto {

    @IsOptional()
    @IsString()
    @ApiProperty({
        example: 'Machado de Assis',
        description: 'Autor'
    })
    autor?: string;

    @IsOptional()
    @IsString()
    @ApiProperty({
        example: 'Brasileiro',
        description: 'Autor brasileiro'
    })
    nacionalidade?: string;

    @IsOptional()
    @IsInt()
    @ApiProperty({
        example: 1885,
        description: 'Ano de nascimento do autor'
    })
    ano_nascimento?: number;
}