import { DataBaseRepository } from "../../DataBase.repository";
import { HydratedDocument, Model } from "mongoose";
export declare class roles {
    name: string;
    description: string;
    permissions: string[];
}
export type rolesDocument = HydratedDocument<roles>;
export declare const rolesSchema: import("mongoose").Schema<roles, Model<roles, any, any, any, import("mongoose").Document<unknown, any, roles, any> & roles & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, roles, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<roles>, {}> & import("mongoose").FlatRecord<roles> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare const ROLES_MODEL = "ROLES_MODEL";
export declare const rolesModel: import("@nestjs/common").DynamicModule;
export declare const getrolesModel: (businessNumber: string) => DataBaseRepository<rolesDocument>;
