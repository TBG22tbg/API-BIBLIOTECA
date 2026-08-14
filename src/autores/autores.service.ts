import { Injectable, NotFoundException } from '@nestjs/common';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { DatabaseService } from 'src/database/database.service';
import { CreateAutorDto } from './dto/create-autor.dto';
import { updateAutorDto } from './dto/update-autor.dto';

@Injectable()
export class AutoresService {
    // Injetamos o DatabaseService dentro do AutoresService,
    //Assim não precisamos criar manualmente uma instância de outra classe
    constructor (private readonly databasService:DatabaseService){}

    async criar (createAutorDto : CreateAutorDto){
        // Aqui estamos desestruturando o DTO para que a gente receba os valores
        const { autor, nacionalidade, ano_nascimento } = createAutorDto;

        // O comando SQL que fará a inserção das informações no nossso banco de dados
        const sql = `
            INSERT INTO autores (
                autor, nacionalidade, ano_nascimento
            )
                VALUES (?, ?, ?)
        `;

        // Executa o INSERT e informa para nós o tipo esperado do resultado
        const resultado = await this.databasService.query(sql, [
            autor, nacionalidade, ano_nascimento
        ]) as ResultSetHeader;

        // Retorna uma resposta mais amigável para o usuário de confirmação
        return {
            mensagem: 'Autor cadastrado com sucesso',
            autor: {
                // O insert contém o ID 
                id: resultado.insertId,
                autor,
                nacionalidade,
                ano_nascimento
            }
        };
    }

    // Função para ver todos os autores cadastrados no meu banco de dados
     async listarAutores() {
        // Irá selecionar todos os autores cadastrados na minha tabela 'autores'
        const resultado = await this.databasService.query(
            'SELECT * FROM autores'
        );
        return resultado;
    }

    //
    async buscaIdAutor(id: number){
        const resultado = await this.databasService.query(
            'SELECT * FROM autores WHERE id = ?', [id]
        ) as RowDataPacket[];
        
        // Se o autor informado não estiver cadastrado o sistema irá retorna com essa mensagem
        if (resultado.length === 0) {
            throw new NotFoundException(
                'Autro não cadastrado em nosso banco de dados'
            )
        }
        return resultado[0];
    }

    // Função para atualizar os dados do autor no meu banco de dados
    async atualizar(id: number, dados:updateAutorDto){
        // Antes de realizar a atualização, buscamos o livro pelo ID.
        // Caso o livro não exista, o método 'buscarIdAutor' já lança a exceção NotFound
        await this.buscaIdAutor(id);

        // Executando o comando SQL de UPDATE no banco de dados
        await this.databasService.query(
            'UPDATE autores SET autor = ?, nacionalidade = ?, ano_nascimento = ? WHERE id = ?',
            // Os valores são substituidos nos '?' na mesma ordem em que aparecem no
            // comando SQL. O 'id' não precisa dos dados, pois é ele quem localiza o autor que será editado.
            [dados.autor, dados.nacionalidade, dados.ano_nascimento, id]
        );
        // Se a atualização foi bem sucedida, o usuário visualizará a mensagem
        return {
            mensagem: 'Dados do Autor atualizado com sucesso'
        };
    }

    // Função para deletar os dados do autor no meu banco de dados
    async remover(id:number){
        // Antes de realizar a exclusão, buscamos o livro pelo ID.
        // Caso não seja encontrado, a função 'buscarIdAutor' já exibe a exceção NotFound
        await this.databasService.query(
            // Executa o comando SQL de delete
            'DELETE FROM autores WHERE id = ?', [id]
        );
        // Localizado o ID, feita a exclusão do banco, o usuário visualizará a confirmação
        return {
            mensagem: 'Dados do autor excluído com sucesso'
        }
    }
}
