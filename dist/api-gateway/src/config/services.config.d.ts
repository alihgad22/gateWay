export interface ServiceConfig {
    path: string;
    target: string;
    pathRewrite?: {
        [key: string]: string;
    };
    excludePaths?: string[];
}
export declare const servicesConfig: Record<string, ServiceConfig>;
