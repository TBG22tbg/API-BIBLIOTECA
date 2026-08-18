import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    // Nos permite utilizar as regras ditas pelo DTO
    constructor (private readonly databaseService:DatabaseService){}

    async cadastrar(createUsuarioDto:CreateUsuarioDto){
        // Primeiro vamos receber os dados (nome, email e senha) passadas pela regra do DTO
        const {nome, email, senha} = createUsuarioDto;

        // Aqui estamos gerando o Hash de senha
        // O número '10' representa o número de caminhos aos quais o hash usa para construir a senha
        const senhaHash = await bcrypt.hash(senha, 10);

        // Salvamos o hash gerado, no banco de dados
        //Não salvamos a senha original enviada pelo usuário
        await this.databaseService.query(
            'INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?)', [nome, email, senhaHash]
        );

        // Este retorno é a confirmação de que a inserção dos dados no banco foi bem sucedida
        return {
            mensagem: 'Usuário cadastrado com sucesso'
        };
    }
}
