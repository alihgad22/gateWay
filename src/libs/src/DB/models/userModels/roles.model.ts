import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ConnectionManager } from "../../connection.manager";
import { DataBaseRepository } from "../../DataBase.repository";
import { HydratedDocument, Model } from "mongoose";
import { permission } from "./permission.model";

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class roles {
  @Prop({ type: String, required: true, unique: true })
  name!: string;

  @Prop({ type: String, required: true })
  description!: string;

  @Prop({ type: [String], required: true, ref: permission.name })
  permissions!: string[];
}

export type rolesDocument = HydratedDocument<roles>;
export const rolesSchema = SchemaFactory.createForClass(roles);
export const ROLES_MODEL = 'ROLES_MODEL';
export const rolesModel = MongooseModule.forFeature([
  { name: 'roles', schema: rolesSchema },
]);

export const getrolesModel = (businessNumber: string): DataBaseRepository<rolesDocument> => {
    if(!businessNumber){
        throw new Error("businessNumber is required in roles Model")
    }
  const connection = ConnectionManager.getConnection(businessNumber);
  const model = connection.models['roles'] || connection.model('roles', rolesSchema) as unknown as Model<rolesDocument>;
  return new DataBaseRepository<rolesDocument>(model);
};