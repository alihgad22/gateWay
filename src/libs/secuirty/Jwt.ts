
import jwt, { Secret, SignOptions, JwtPayload as BaseJwtPayload } from "jsonwebtoken"

// Custom JWT payload interface that extends the base JwtPayload
export interface CustomJwtPayload extends BaseJwtPayload {
  _id: string;
  businessNumber: string;
  jwtSecret: string;
  [key: string]: any;
}


export const generateToken = (payload: any, secret: string = process.env.JWT_SECRET as string, expireAt: string | number = '1d'): string => {
  // Using a type assertion for expiresIn to match the expected type
  const options: SignOptions = { 
    expiresIn: expireAt as jwt.SignOptions['expiresIn']
  };
  return jwt.sign(payload, secret as Secret, options);
}

export const verifyToken = (token: string, secret: string = process.env.JWT_SECRET as string): CustomJwtPayload | string => {
  // Use type assertion to convert the standard JwtPayload to our CustomJwtPayload
  return jwt.verify(token, secret as Secret) as CustomJwtPayload | string;
}


export const createJWTSecret = (length: number = 10): string => {
    return [...Array(length)].map(() => 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.charAt(Math.floor(Math.random() * 62))).join('');
}
