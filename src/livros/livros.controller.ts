import { Controller, Body, Post, Get, ParseIntPipe, Param } from '@nestjs/common';
import { CreateLivroDto } from './dto/create-livro.dto';
import { LivrosService } from './livros.service';

@Controller('livros')
export class LivrosController {
    // Injetamos o LivrosService com depêndencia para o controller acessar
    constructor (private readonly livroService : LivrosService){}

    // Define o endpoint POST/livros
    @Post()
    criar(@Body() createLivroDto : CreateLivroDto){
        // O @Body captura os dados enviados no corpo da requisição
        // O DTO define como esses dados deverão ser validados.
        return this.livroService.criar(createLivroDto);
    }

    // Define o endpoint GET/livros
    @Get()
    listarTodos(){
        return this.livroService.listarTodos();
    };

    // Define o endpoint GET/livros/:id
    @Get(':id')
    buscaPorId(
        @Param('id', ParseIntPipe) id: number
    ) {
        return this.livroService.buscaPorId(id);
    }
}
