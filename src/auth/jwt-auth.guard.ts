import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler(),
    );

    if (isPublic) {
      // This route is marked as public, no need for authentication
      return true;
    }

    return super.canActivate(context);
  }

  handleRequest(err, user, info: Error, context: ExecutionContext) {
    // If there's an authentication error, handle it here
    // TODO: err is coming back as undefined
    // Look into this to see if info is always an error and can replace err
    if (err || !user) {
      if (info.message === 'No auth token') {
        // Token is missing, you may want to redirect to the login page or handle it accordingly
        throw new UnauthorizedException('No auth token provided');
      }

      if (info.message === 'jwt expired') {
        // Token is expired
        throw new UnauthorizedException('Token has expired');
      }

      // Handle other authentication errors if needed
      throw err || new UnauthorizedException(info.message);
    }

    // If authentication was successful, you can access the user information here
    if (user) {
      const request = context.switchToHttp().getRequest();
      request.user = user; // Attach the user information to the request object
    }

    return user;
  }
}
