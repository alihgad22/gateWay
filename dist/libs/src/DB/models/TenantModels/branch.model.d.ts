import { HydratedDocument, Model } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
export declare class Branch {
    name: string;
    type: string;
}
export type BranchDocument = HydratedDocument<Branch> & {
    _id: string;
};
export declare const BranchSchema: import("mongoose").Schema<Branch, Model<Branch, any, any, any, import("mongoose").Document<unknown, any, Branch, any> & Branch & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Branch, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Branch>, {}> & import("mongoose").FlatRecord<Branch> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare const Branch_MODEL = "Branch_MODEL";
export declare const BranchModel: import("@nestjs/common").DynamicModule;
export declare const getBranchModel: (businessNumber: string) => DataBaseRepository<BranchDocument>;
