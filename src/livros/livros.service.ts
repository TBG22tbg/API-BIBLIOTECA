import { Injectable } from '@nestjs/common';
import { ResultSetHeader } from 'mysql2';
import { DatabaseService } from 'src/database/database.service';
import { CreateLivroDto } from './dto/create-livro.dto';

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
}
