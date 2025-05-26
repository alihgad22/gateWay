import { FilterQuery, Model, PopulateOptions, QueryOptions, UpdateQuery, UpdateWriteOpResult } from "mongoose";
interface FindOptions<TDocument> {
    filter?: FilterQuery<TDocument>;
    populate?: PopulateOptions[];
    limit?: number;
    select?: string;
    page?: number;
    sort?: string;
}
export declare class DataBaseRepository<TDocument> {
    private readonly model;
    constructor(model: Model<TDocument>);
    create(data: Partial<TDocument>): Promise<TDocument>;
    insertMany(data: Partial<TDocument>[]): Promise<TDocument[]>;
    findOne(query: FilterQuery<TDocument>, select?: string | Record<string, 0 | 1>, populate?: PopulateOptions[]): Promise<TDocument | null>;
    find({ filter, populate, page, sort, select, limit, }: FindOptions<TDocument>): Promise<TDocument[] | []>;
    findById(id: String, select?: string, populate?: PopulateOptions | PopulateOptions[]): Promise<TDocument | null>;
    findAll(): Promise<TDocument[]>;
    findOneAndUpdate(query: FilterQuery<TDocument>, data: UpdateQuery<TDocument>, options?: QueryOptions): Promise<TDocument | null>;
    findOneAndDelete(query: FilterQuery<TDocument>, options?: QueryOptions): Promise<TDocument | null>;
    updateOne(query: FilterQuery<TDocument>, update: UpdateQuery<TDocument>): Promise<UpdateWriteOpResult>;
    findByIdAndUpdate(id: string, data: Partial<TDocument>): Promise<TDocument | null>;
    deleteOne(query: FilterQuery<TDocument>): Promise<TDocument | null>;
    deleteMany(query: FilterQuery<TDocument>): Promise<void>;
    findByIdAndDelete(id: string): Promise<TDocument | null>;
}
export {};
