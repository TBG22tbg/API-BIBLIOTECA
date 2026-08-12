import { Module } from '@nestjs/common';
import { LivrosController } from './livros.controller';
import { LivrosService } from './livros.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  // Importamos o DatabaseService porque o livrosService precisará acessar o banco.
  imports: [DatabaseModule],
  controllers: [LivrosController],
  providers: [LivrosService]
})
export class LivrosModule {}
