import { Controller, Body, Post, Get, Put, Delete, ParseIntPipe, Param } from '@nestjs/common';
import { CreateAutorDto } from './dto/create-autor.dto';
import { AutoresService } from './autores.service';
import { updateAutorDto } from './dto/update-autor.dto';

@Controller('autores')
export class AutoresController {
    // Injetamos o AutoresService com depêndencia para o controller acessar
    constructor (private readonly autoresService : AutoresService){}

    @Post()
    criar(@Body() createAutorDto : CreateAutorDto){
        return this.autoresService.criar(createAutorDto);
    }

    // Define o endpoint GET/autores
        @Get()
        listarAutores(){
            return this.autoresService.listarAutores();
        };
    
        // Define o endpoint GET/autores/:id
        @Get(':id')
        buscaIdAutor(
            @Param('id', ParseIntPipe) id: number
        ) {
            return this.autoresService.buscaIdAutor(id);
        }

        // Define o endpoint PUT/autores/:id
        @Put(':id')
            atualizar(@Param('id') id: number, @Body() dados:updateAutorDto){
                return this.autoresService.atualizar(id, dados);
        }

        // Define o endpoint DELETE/autores/:id
        @Delete(':id')
            remover(@Param('id') id:number){
                return this.autoresService.remover(id);
        }
}