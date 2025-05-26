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
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const Jwt_1 = require("../Jwt");
const users_model_1 = require("../../DB/models/userModels/users.model");
const crypto_helper_1 = require("../crypto.helper");
let AuthGuard = class AuthGuard {
    constructor(cryptoHelper) {
        this.cryptoHelper = cryptoHelper;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest() || graphql_1.GqlExecutionContext.create(context).getContext().req;
        const token = request.headers.authorization;
        if (!token) {
            throw new Error('Forbidden resource');
        }
        try {
            const payload = await (0, Jwt_1.verifyToken)(token, process.env.JWT_SECRET);
            let userModel = (0, users_model_1.getUserModel)(payload.businessNumber);
            const user = await userModel.findById(payload._id, 'email jwtSecret firstName lastName userName role isOwner phone', { path: 'role', select: 'name description permissions' });
            if (!user) {
                throw new common_1.ForbiddenException('Forbidden resource');
            }
            if (this.cryptoHelper.decrypt(user?.jwtSecret).toString() !== this.cryptoHelper.decrypt(payload.jwtSecret).toString()) {
                throw new common_1.ForbiddenException('Forbidden resource');
            }
            request['user'] = user;
            request['businessNumber'] = payload.businessNumber;
        }
        catch (error) {
            if (error instanceof Error) {
                throw new common_1.ForbiddenException(error.message);
            }
            throw new common_1.ForbiddenException('An unknown error occurred');
        }
        return true;
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [crypto_helper_1.CryptoHelper])
], AuthGuard);
//# sourceMappingURL=authentication.js.map