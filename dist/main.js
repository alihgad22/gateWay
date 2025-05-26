"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const logger = new common_1.Logger('Bootstrap');
    try {
        logger.log('Starting API Gateway...');
        const app = await core_1.NestFactory.create(app_module_1.AppModule, {
            logger: ['error', 'warn', 'log', 'debug', 'verbose'],
        });
        const port = 3000;
        logger.log(`Initializing HTTP server on port ${port}`);
        app.enableCors({
            origin: true,
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
            credentials: true,
        });
        logger.log('CORS enabled');
        await app.listen(port);
        logger.log(`🚀 API Gateway is running on http://localhost:${port}`);
        logger.log('✅ API Gateway is ready');
    }
    catch (error) {
        logger.error('❌ Failed to start API Gateway:', error);
        process.exit(1);
    }
}
bootstrap();
//# sourceMappingURL=main.js.map