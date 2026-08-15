import { Controller, Body, Post, Get, Put, Delete, ParseIntPipe, Param} from '@nestjs/common';
import { CreateLivroDto } from './dto/create-livro.dto';
import { LivrosService } from './livros.service';
import { updateLivroDto } from './dto/update-livro.dto';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

@ApiTags('Livros') // Coloca uma Tag chamada "Livros"
@Controller('livros')
export class LivrosController {
    // Injetamos o LivrosService com depêndencia para o controller acessar
    constructor (private readonly livroService : LivrosService){}

    // Define o endpoint POST/livros
    @Post()
    // O ApiOperation serve para dizer a ação que o endpoint faz, qual o proposito dele.
    @ApiOperation({
        summary: 'Cadastrar um novo livro'
    })
    @ApiResponse({
        status: 201,
        description: 'Livro cadastrado com sucesso'
    })
    @ApiResponse({
        status: 404,
        description: 'Não foi possível cadastrar o livro'
    })

    criar(@Body() createLivroDto : CreateLivroDto){
        // O @Body captura os dados enviados no corpo da requisição
        // O DTO define como esses dados deverão ser validados.
        return this.livroService.criar(createLivroDto);
    }

    // Define o endpoint GET/livros
    @Get()
    @ApiOperation({
        summary: 'Retornar todos os livros cadastrados'
    })
    @ApiResponse({
        status: 201,
        description: 'Lista de livros retornada com sucesso'
    })
    @ApiResponse({
        status: 404,
        description: 'Não foi possível retornar a lista de livros'
    })

    listarTodos(){
        return this.livroService.listarTodos();
    };

    // Define o endpoint GET/livros/:id
    @Get(':id')
    @ApiOperation({
        summary: 'Localizar livro pelo ID'
    })
    @ApiResponse({
        status: 201,
        description: 'Livro encontrado com sucesso'
    })
    @ApiResponse({
        status: 404,
        description: 'Livro não cadastrado'
    })

    buscaPorId(
        @Param('id', ParseIntPipe) id: number
    ) {
        return this.livroService.buscaPorId(id);
    }

    // Define o endpoint PUT/livros/:id
    @Put(':id')
    @ApiOperation({
        summary: 'Atualizar livro pelo ID'
    })
    @ApiResponse({
        status: 201,
        description: 'Livro atualizado com sucesso'
    })
    @ApiResponse({
        status: 404,
        description: 'Não foi possível atualizar o livro'
    })

    atualizar(@Param('id') id: number, @Body() dados:updateLivroDto){
        return this.livroService.atualizar(id, dados);
    }

    // Define o endpoint DELETE/livros/:id
    @Delete(':id')
    @ApiOperation({
        summary: 'Remover um livro pelo ID'
    })
    @ApiResponse({
        status: 201,
        description: 'Livro removido com sucesso'
    })
    @ApiResponse({
        status: 404,
        description: 'Não foi possível remover o livro'
    })

    remover(@Param('id') id:number){
        return this.livroService.remover(id);
    }
}
