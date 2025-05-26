"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kafkaConfig = void 0;
const microservices_1 = require("@nestjs/microservices");
exports.kafkaConfig = microservices_1.ClientsModule.register([
    {
        name: 'KAFKA_SERVICE',
        transport: microservices_1.Transport.KAFKA,
        options: {
            client: {
                clientId: 'api-gateway',
                brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
            },
            consumer: {
                groupId: 'api-gateway-consumer',
            },
            producer: {
                allowAutoTopicCreation: true,
            },
        },
    },
]);
//# sourceMappingURL=kafka.config.js.map