import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';

import { Middleware } from './middleware.interface.js';
import { HttpError } from '../errors/index.js';

export class AnonymousRouteMiddleware implements Middleware {
  public async execute({ tokenPayload }: Request, _res: Response, next: NextFunction): Promise<void> {
    console.log('AnonymousRouteMiddleware: tokenPayload', tokenPayload);

    if (tokenPayload) {
      throw new HttpError(
        StatusCodes.FORBIDDEN,
        'Authorized',
        'AnonymousRouteMiddleware'
      );
    }

    return next();
  }
}
