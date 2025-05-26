"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ProxyMiddleware_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProxyMiddleware = void 0;
const common_1 = require("@nestjs/common");
const http_proxy_middleware_1 = require("http-proxy-middleware");
const services_config_1 = require("./config/services.config");
let ProxyMiddleware = ProxyMiddleware_1 = class ProxyMiddleware {
    constructor() {
        this.logger = new common_1.Logger(ProxyMiddleware_1.name);
    }
    use(req, res, next) {
        const service = this.getTargetService(req.path);
        if (!service) {
            this.logger.warn(`No service configuration found for path: ${req.path}`);
            next();
            return;
        }
        const proxyOptions = this.createProxyOptions(service);
        const proxy = (0, http_proxy_middleware_1.createProxyMiddleware)(proxyOptions);
        return proxy(req, res, next);
    }
    getTargetService(path) {
        return Object.values(services_config_1.servicesConfig).find(service => path.startsWith(`/${service.path}`)) || null;
    }
    createProxyOptions(service) {
        return {
            target: service.target,
            changeOrigin: true,
            pathRewrite: service.pathRewrite,
            logLevel: 'error',
            onError: (err, req, res) => {
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
};
exports.ProxyMiddleware = ProxyMiddleware;
exports.ProxyMiddleware = ProxyMiddleware = ProxyMiddleware_1 = __decorate([
    (0, common_1.Injectable)()
], ProxyMiddleware);
//# sourceMappingURL=proxy.middleware.js.map