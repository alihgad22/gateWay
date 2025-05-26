import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';



async function bootstrap() {
  const logger = new Logger('Bootstrap');
  try {
    logger.log('Starting API Gateway...');

    const app = await NestFactory.create(AppModule, {
      logger: ['error', 'warn', 'log', 'debug', 'verbose'],
    });
    const port = 3000;
    logger.log(`Initializing HTTP server on port ${port}`);

    // Enable CORS
    app.enableCors({
      origin: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true,
    });
    logger.log('CORS enabled');

    await app.listen(port);
    logger.log(`🚀 API Gateway is running on http://localhost:${port}`);
    logger.log('✅ API Gateway is ready');

  } catch (error) {
    logger.error('❌ Failed to start API Gateway:', error);
    process.exit(1);
  }
}

bootstrap(); 