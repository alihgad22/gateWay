import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { createProxyMiddleware, Options } from 'http-proxy-middleware';
import { servicesConfig, ServiceConfig } from './config/services.config';

@Injectable()
export class ProxyMiddleware implements NestMiddleware {
  private readonly logger = new Logger(ProxyMiddleware.name);

  use(req: Request, res: Response, next: Function) {
    const service = this.getTargetService(req.path);
    
    if (!service) {
      this.logger.warn(`No service configuration found for path: ${req.path}`);
      next();
      return;
    }

    const proxyOptions: Options = this.createProxyOptions(service);
    const proxy = createProxyMiddleware(proxyOptions);

    return proxy(req, res, next as NextFunction);
  }

  private getTargetService(path: string): ServiceConfig | null {
    return Object.values(servicesConfig).find(service => 
      path.startsWith(`/${service.path}`)
    ) || null;
  }

  private createProxyOptions(service: ServiceConfig): Options {
    return {
      target: service.target,
      changeOrigin: true,
      pathRewrite: service.pathRewrite,
      logLevel: 'error',
      onError: (err: Error, req: Request, res: Response) => {
        this.logger.error(`Proxy Error: ${err.message}`, err.stack);
        res.writeHead(502, {
          'Content-Type': 'application/json',
        });
        res.end(JSON.stringify({
          status: 502,
          message: 'Service Unavailable',
          error: err.message,
          path: req.path,
        }));
      },
      onProxyReq: (proxyReq, req, res) => {
        // يمكنك إضافة headers مخصصة هنا
        proxyReq.setHeader('x-forwarded-by', 'api-gateway');
        
        if (req.body) {
          const bodyData = JSON.stringify(req.body);
          proxyReq.setHeader('Content-Type', 'application/json');
          proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
          proxyReq.write(bodyData);
        }
      },
      onProxyRes: (proxyRes, req, res) => {
        proxyRes.headers['x-proxied-by'] = 'api-gateway';
      },
    };
  }
} 