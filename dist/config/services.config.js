"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.servicesConfig = void 0;
exports.servicesConfig = {
    tenants: {
        path: 'tenants',
        target: process.env.TENANT_SERVICE_URL || 'http://localhost:3001',
        pathRewrite: { '^/tenants': '' },
        excludePaths: ['users/(.*)', 'devices/(.*)'],
    },
    users: {
        path: 'users',
        target: process.env.USERS_SERVICE_URL || 'http://localhost:3002',
        pathRewrite: { '^/users': '' },
        excludePaths: ['tenants/(.*)', 'devices/(.*)'],
    },
    devices: {
        path: 'devices',
        target: process.env.DEVICES_SERVICE_URL || 'http://localhost:3003',
        pathRewrite: { '^/devices': '' },
        excludePaths: ['tenants/(.*)', 'users/(.*)'],
    },
};
//# sourceMappingURL=services.config.js.map