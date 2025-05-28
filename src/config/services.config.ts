export interface ServiceConfig {
  path: string;
  target: string;
  pathRewrite?: { [key: string]: string };
  excludePaths?: string[];
}

export const servicesConfig: Record<string, ServiceConfig> = {
  tenants: {
    path: 'tenants',
    target: process.env.TENANT_SERVICE_URL || 'https://caducstenant-production.up.railway.app/',
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