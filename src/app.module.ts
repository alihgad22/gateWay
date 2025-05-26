import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProxyMiddleware } from './proxy.middleware';
import { servicesConfig } from './config/services.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    // تكوين الـ routes لكل الخدمات بشكل ديناميكي
    Object.entries(servicesConfig).forEach(([name, config]) => {
      consumer
        .apply(ProxyMiddleware)
        .exclude(...(config.excludePaths || []))
        .forRoutes({
          path: `${config.path}/*`,
          method: RequestMethod.ALL,
        });
    });
  }
} 