import { Controller, Body, Post, Get, Put, Delete, ParseIntPipe, Param } from '@nestjs/common';
import { CreateAutorDto } from './dto/create-autor.dto';
import { AutoresService } from './autores.service';
import { updateAutorDto } from './dto/update-autor.dto';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

@Controller('autores')
export class AutoresController {
    // Injetamos o AutoresService com depêndencia para o controller acessar
    constructor(private readonly autoresService: AutoresService) { }

    @Post()
    // O ApiOperation serve para dizer a ação que o endpoint faz, qual o proposito dele.
    @ApiOperation({
        summary: 'Cadastrar um novo autor'
    })
    @ApiResponse({
        status: 201,
        description: 'Autor cadastrado com sucesso'
    })
    @ApiResponse({
        status: 404,
        description: 'Não foi possível cadastrar o autor'
    })

    criar(@Body() createAutorDto: CreateAutorDto) {
        return this.autoresService.criar(createAutorDto);
    }

    // Define o endpoint GET/autores
    @Get()
    @ApiOperation({
        summary: 'Retornar todos os autores cadastrados'
    })
    @ApiResponse({
        status: 201,
        description: 'Lista de autores retornada com sucesso'
    })
    @ApiResponse({
        status: 404,
        description: 'Não foi possível retornar a lista dos autores'
    })

    listarAutores() {
        return this.autoresService.listarAutores();
    };

    // Define o endpoint GET/autores/:id
    @Get(':id')
    @ApiOperation({
        summary: 'Localizar autor pelo ID'
    })
    @ApiResponse({
        status: 201,
        description: 'Autor encontrado com sucesso'
    })
    @ApiResponse({
        status: 404,
        description: 'Autor não cadastrado'
    })

    buscaIdAutor(
        @Param('id', ParseIntPipe) id: number
    ) {
        return this.autoresService.buscaIdAutor(id);
    }

    // Define o endpoint PUT/autores/:id
    @Put(':id')
    @ApiOperation({
        summary: 'Atualizar Autor pelo ID'
    })
    @ApiResponse({
        status: 201,
        description: 'Autor atualizado com sucesso'
    })
    @ApiResponse({
        status: 404,
        description: 'Não foi possível atualizar o Autor'
    })

    atualizar(@Param('id', ParseIntPipe) id: number, @Body() dados: updateAutorDto) {
        return this.autoresService.atualizar(id, dados);
    }

    // Define o endpoint DELETE/autores/:id
    @Delete(':id')
    @ApiOperation({
        summary: 'Remover um autor pelo ID'
    })
    @ApiResponse({
        status: 201,
        description: 'Autor removido com sucesso'
    })
    @ApiResponse({
        status: 404,
        description: 'Não foi possível remover o autor'
    })
    remover(@Param('id', ParseIntPipe) id: number) {
        return this.autoresService.remover(id);
    }
}