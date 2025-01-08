import { JwtPayload } from 'jsonwebtoken';
import { Request } from 'express';

// Extend the Request interface
declare module 'express-serve-static-core' {
  interface Request {
    user?: string | JwtPayload; // Adjust the type to match what `jwt.verify` returns
  }
}
