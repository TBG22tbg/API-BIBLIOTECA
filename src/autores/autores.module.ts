import { Module } from '@nestjs/common';
import { AutoresController } from './autores.controller';
import { AutoresService } from './autores.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  // Importamos o DatabaseService porque o autoresService precisará acessar o banco.
  imports: [DatabaseModule],
  controllers: [AutoresController],
  providers: [AutoresService]
})
export class AutoresModule {}
