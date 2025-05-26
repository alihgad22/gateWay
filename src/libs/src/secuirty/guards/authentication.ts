

import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { verifyToken } from '../Jwt';
import { getUserModel } from '../../DB/models/userModels/users.model';
import { CryptoHelper } from '../crypto.helper';
import { Inject } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly cryptoHelper: CryptoHelper,
  ) {}

  async canActivate(context: ExecutionContext): Promise<any> {
    const request = context.switchToHttp().getRequest() || GqlExecutionContext.create(context).getContext().req;
    const token = request.headers.authorization;
    if (!token) {
      throw new Error('Forbidden resource');
    }
    try {
      const payload = await verifyToken(token, process.env.JWT_SECRET)
      let userModel = getUserModel(payload.businessNumber)
      const user = await userModel.findById(
        payload._id,
        'email jwtSecret firstName lastName userName role isOwner phone',
        { path: 'role', select: 'name description permissions' }
      );
      if (!user) {
        throw new ForbiddenException('Forbidden resource');
      }
      if (this.cryptoHelper.decrypt(user?.jwtSecret)!.toString() !== this.cryptoHelper.decrypt(payload.jwtSecret)!.toString()) {
        throw new ForbiddenException('Forbidden resource');
      }
      request['user'] = user;
      request['businessNumber'] = payload.businessNumber;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new ForbiddenException(error.message);
      }
      throw new ForbiddenException('An unknown error occurred');
    }

    return true;
  }
}