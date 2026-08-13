import { Controller, Body, Post, Get, ParseIntPipe, Param } from '@nestjs/common';
import { CreateAutorDto } from './dto/create-autor.dto';
import { AutoresService } from './autores.service';

@Controller('autores')
export class AutoresController {
    // Injetamos o AutoresService com depêndencia para o controller acessar
    constructor (private readonly autoresService : AutoresService){}

    @Post()
    criar(@Body() createAutorDto : CreateAutorDto){
        return this.autoresService.criar(createAutorDto);
    }

    // Define o endpoint GET/livros
        @Get()
        listarAutores(){
            return this.autoresService.listarAutores();
        };
    
        // Define o endpoint GET/livros/:id
        @Get(':id')
        buscaIdAutor(
            @Param('id', ParseIntPipe) id: number
        ) {
            return this.autoresService.buscaIdAutor(id);
        }
}