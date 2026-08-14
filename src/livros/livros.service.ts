import { Injectable, NotFoundException } from '@nestjs/common';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { DatabaseService } from 'src/database/database.service';
import { CreateLivroDto } from './dto/create-livro.dto';
import { updateLivroDto } from './dto/update-livro.dto';

@Injectable()
export class LivrosService {
    // Injetamos o DatabaseService dentro do LivrosService,
    //Assim não precisamos criar manualmente uma instância de outra classe
    constructor (private readonly databasService:DatabaseService){}

    async criar (createLivroDto : CreateLivroDto){
        // Aqui estamos desestruturando o DTO para que a gente receba os valores
        const { titulo, autor, ano, disponivel } = createLivroDto;

        // O comando SQL que fará a inserção das informações no nossso banco de dados
        const sql = `
            INSERT INTO livro (
                titulo, autor, ano, disponivel
            )
                VALUES (?, ?, ?, ?)
        `;

        // Executa o INSERT e informa para nós o tipo esperado do resultado
        const resultado = await this.databasService.query(sql, [
            titulo, autor, ano, disponivel
        ]) as ResultSetHeader;

        // Retorna uma resposta mais amigável para o usuário de confirmação
        return {
            mensagem: 'Livro cadastrado com sucesso',
            livro: {
                // O insert contém o ID 
                id: resultado.insertId,
                titulo,
                autor,
                ano,
                disponivel
            }
        };
    }

    // O objetivo dessa função será a exibição de todos os livros cadastrados
    async listarTodos() {
        // A constante resultado terá armazenado todos os livros cadastrados na tabela 'livro' do banco de dados.
        const resultado = await this.databasService.query(
            'SELECT * FROM livro'
        );
        return resultado;
    }

    // Realizará a busca de um livro através do ID gerado pelo banco de dados
    async buscaPorId(id: number){
        const resultado = await this.databasService.query(
            'SELECT * FROM livro WHERE id = ?', [id]
        ) as RowDataPacket[];
        // O RowDataPacket[] informa ao TypeScript que o resultado da consulta será tratado como uma lista de registros retornados pelo banco de dados.
        
        // Essa condição irá verificar se a consulta não encontrar nenhum livro.
        // Se a lista estiver vazia, o seu tamanho (length) será igual a 0
        if (resultado.length === 0) {
            // Interrompe a execução da requisição e retorna uma resposta HTTP 404 (Not Found), informando que o livro solicitado não foi encontrado.
            throw new NotFoundException(
                'Livro não encontrado'
            )
        }

        return resultado[0];
    }

    // Essa função será responsável por realizar a atualização dos livros já cadastrados no banco de dados.
    async atualizar(id: number, dados: updateLivroDto){
        // Antes de realizar a atualização, buscamos o livro pelo ID.
        // Caso o livro não exista, o método 'buscarPorId' já lança a exceção NotFound
        await this.buscaPorId(id);

        // Executando o comando SQL de UPDATE no banco de dados
        // Os sinais de '?' representam os valores que serão enviados no array logo abaixo
        await this.databasService.query(
            'UPDATE livro SET titulo = ?, autor = ?, ano = ?, disponivel = ? WHERE id = ?',
            // Os valores são substituidos nos '?' na mesma ordem em que aparecem no
            // comando SQL. O 'id' não precisa dos dados, pois é ele quem localiza o livro que será editado.
            [dados.titulo, dados.autor, dados.ano, dados.disponivel, id]
        );
        // Se a atualização foi bem sucedida, o usuário visualizará a mensagem
        return {
            mensagem: 'Livro atualizado com sucesso'
        };
    }

    // Função responsável por deletar um livro cadastrado no banco de dados
    async remover(id:number){
        // Antes de realizar a exclusão, buscamos o livro pelo ID.
        // Caso não seja encontrado, a função 'buscaPorId' já exibe a exceção NotFound
        await this.databasService.query(
            // Executa o comando SQL de deleção
            'DELETE FROM livro WHERE id = ?', [id]
        );
        // Localizado o ID, feita a exclusão do banco, o usuário visualizará a confirmação
        return {
            mensagem: 'Livro excluído com sucesso'
        }
    }
}
