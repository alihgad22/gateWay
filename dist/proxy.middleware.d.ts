import { NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
export declare class ProxyMiddleware implements NestMiddleware {
    private readonly logger;
    use(req: Request, res: Response, next: Function): void;
    private getTargetService;
    private createProxyOptions;
}
