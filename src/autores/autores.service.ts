import { Injectable, NotFoundException } from '@nestjs/common';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { DatabaseService } from 'src/database/database.service';
import { CreateAutorDto } from './dto/create-autor.dto';

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
}
