import { HydratedDocument, Model, Types } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
export declare class User {
    constructor(firstName: string, lastName: string, phone: string, role: Types.ObjectId[], isOwner: Boolean, jwtSecret: string, cashirLogin?: string, email?: string, password?: string);
    firstName: string;
    lastName: string;
    email?: string;
    password?: string;
    phone: string;
    isOwner: Boolean;
    role: Types.ObjectId[];
    jwtSecret: string;
    cashirLogin?: string;
    userName?: string;
}
export type UserDocument = HydratedDocument<User>;
export declare const UserSchema: import("mongoose").Schema<User, Model<User, any, any, any, import("mongoose").Document<unknown, any, User, any> & User & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<User>, {}> & import("mongoose").FlatRecord<User> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare const USER_MODEL = "USER_MODEL";
export declare const UserModel: import("@nestjs/common").DynamicModule;
export declare const getUserModel: (businessNumber: string) => DataBaseRepository<UserDocument>;
