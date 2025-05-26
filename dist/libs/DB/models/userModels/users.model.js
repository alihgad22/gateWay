"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserModel = exports.UserModel = exports.USER_MODEL = exports.UserSchema = exports.User = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const DataBase_repository_1 = require("../../DataBase.repository");
const connection_manager_1 = require("../../connection.manager");
const Hash_helper_1 = require("../../../secuirty/Hash.helper");
const dotenv = require("dotenv");
const path = require("path");
const roles_model_1 = require("./roles.model");
const crypto_exporter_1 = require("../../../secuirty/crypto.exporter");
dotenv.config({ path: path.resolve(__dirname, '../../../../.env') });
let User = class User {
    constructor(firstName, lastName, phone, role, isOwner, jwtSecret, cashirLogin, email, password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.role = role;
        this.isOwner = isOwner;
        this.jwtSecret = jwtSecret;
        this.cashirLogin = cashirLogin;
        this.email = email;
        this.password = password;
    }
};
exports.User = User;
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, minlength: 2, maxlength: 20 }),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, minlength: 2, maxlength: 20 }),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, select: false }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, select: false }),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean }),
    __metadata("design:type", Boolean)
], User.prototype, "isOwner", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [mongoose_2.Types.ObjectId], ref: 'roles' }),
    __metadata("design:type", Array)
], User.prototype, "role", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, select: false }),
    __metadata("design:type", String)
], User.prototype, "jwtSecret", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], User.prototype, "cashirLogin", void 0);
exports.User = User = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }),
    __metadata("design:paramtypes", [String, String, String, Array, Boolean, String, String, String, String])
], User);
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
exports.USER_MODEL = 'USER_MODEL';
exports.UserModel = mongoose_1.MongooseModule.forFeature([{ name: 'User', schema: exports.UserSchema }]);
exports.UserSchema.virtual('userName').get(function () {
    return `${this.firstName} ${this.lastName}`;
});
exports.UserSchema.pre("save", function (next) {
    if (this.isModified('password')) {
        if (this.password !== undefined) {
            this.password = (0, Hash_helper_1.Hash)(this.password, Number(process.env.SALT_ROUND) || 10);
        }
    }
    if (this.isModified('phone')) {
        if (this.phone !== undefined) {
            this.phone = crypto_exporter_1.CryptoExporter.encrypt(this.phone, process.env.CRYPTO_SECRET);
        }
    }
    if (this.isModified('jwtSecret')) {
        if (this.jwtSecret !== undefined) {
            this.jwtSecret = crypto_exporter_1.CryptoExporter.encrypt(this.jwtSecret, process.env.CRYPTO_SECRET);
        }
    }
    next();
});
const getUserModel = (businessNumber) => {
    if (!businessNumber) {
        throw new Error("businessNumber is required in user model");
    }
    let connection = connection_manager_1.ConnectionManager.getConnection(businessNumber);
    if (!connection.models['roles']) {
        connection.model('roles', roles_model_1.rolesSchema);
    }
    const model = connection.models['User'] || connection.model('User', exports.UserSchema);
    return new DataBase_repository_1.DataBaseRepository(model);
};
exports.getUserModel = getUserModel;
//# sourceMappingURL=users.model.js.map