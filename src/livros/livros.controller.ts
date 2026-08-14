import { Controller, Body, Post, Get, Put, Delete, ParseIntPipe, Param} from '@nestjs/common';
import { CreateLivroDto } from './dto/create-livro.dto';
import { LivrosService } from './livros.service';
import { updateLivroDto } from './dto/update-livro.dto';

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

    // Define o endpoint PUT/livros/:id
    @Put(':id')
    atualizar(@Param('id') id: number, @Body() dados:updateLivroDto){
        return this.livroService.atualizar(id, dados);
    }

    // Define o endpoint DELETE/livros/:id
    @Delete(':id')
    remover(@Param('id') id:number){
        return this.livroService.remover(id);
    }
}
