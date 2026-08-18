import { Controller, Body, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { ApiResponse, ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
    constructor (private readonly authService:AuthService){}

    // Define o endpoint POST /auth/cadastro
    @Post('cadastro')
    @ApiOperation({
        summary: 'Cadastra um usuário'
    })
    @ApiResponse({
        status: 201,
        description: 'Usuário cadastrado com sucesso'
    })
    @ApiResponse({
        status: 404,
        description: 'Não foi possível cadastrar o usuário'
    })
    cadastrar(@Body() createUsuarioDto:CreateUsuarioDto){
        return this.authService.cadastrar(createUsuarioDto);
    }
}
