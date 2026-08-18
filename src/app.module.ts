import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/Config';
import { DatabaseModule } from './database/database.module';
import { LivrosModule } from './livros/livros.module';
import { AutoresModule } from './autores/autores.module';
import { AuthModule } from './auth/auth.module';

@Module({
  // Aqui serão registrado os módulos utilizados pela aplicação
  imports: [
    // Torna visivel para toda a aplicação as variáveis presentes no .env.example
    ConfigModule.forRoot({
      isGlobal: true
    }),
    DatabaseModule,
    LivrosModule,
    AutoresModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
