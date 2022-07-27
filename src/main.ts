import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';

async function bootstrap() {
  //  cria um logger para debug
  const logger = new Logger('API');

  // carrega as configurações do arquivo .env
  const configService = new ConfigService();

  // cria um app nestjs
  const app = await NestFactory.create(AppModule);

  //  iniciar um app nestjs -- abre a porta para acesso dos endpoints
  await app.listen(configService.get<number>('API_PORT'), () => {
    //  imprime no console a porta aberta
    logger.debug(
      `API rodando na porta ${configService.get<number>('API_PORT')}`,
    );
  });
}
bootstrap();
