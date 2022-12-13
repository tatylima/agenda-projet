import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
		cors: true, // < Habilitando CORS no Nest
	});

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('agenda-projet')
    .setDescription('Agendas Personalizadas')
    .setVersion('1.0.0')
    .addTag('status')
    .addTag('auth')
    .addTag('product')
    .addTag('user')
    .addTag('profile')
    .addTag('genre')
    .addTag('order')  // < A ORDEM PODE SER ALTERADA
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3333);
}
bootstrap();
