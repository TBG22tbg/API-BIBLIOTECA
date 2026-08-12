import { Controller, Body, Post } from '@nestjs/common';
import { CreateAutorDto } from './dto/create-autor.dto';
import { AutoresService } from './autores.service';

@Controller('autores')
export class AutoresController {
    // Injetamos o LivrosService com depêndencia para o controller acessar
    constructor (private readonly autoresService : AutoresService){}

    // Define o
    @Post()
    criar(@Body() createAutorDto : CreateAutorDto){
        // O @Body captura os dados enviados no corpo da requisição
        // O DTO define como esses dados deverão ser validados.
        return this.autoresService.criar(createAutorDto);
    }
}