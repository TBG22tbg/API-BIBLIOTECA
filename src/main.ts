import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'; 

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      // Remove a propriedade que não existe no DTO
      whitelist: true,
      // Retorna o erro quando uma propriedade desconhecida é enviada.
      forbidNonWhitelisted: true,
      // Tenta transformar os valores recebidos
      // para os tipos esperados pela aplicação
      transform: true
    })
  )
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
