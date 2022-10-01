import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/enums/roles.enum';
import { ROLES_KEY } from './roles.decorator';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtTokenService: JwtService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }

    const user = context.switchToHttp().getRequest();
    const headers = user.headers;
    const jwt = headers.jwt;

    if (!jwt) return false;
    const decodedJwt = this.jwtTokenService.decode(jwt);
    if (!decodedJwt) return false;
    const userRoles = decodedJwt['role'];
    if (!userRoles) return false;

    return requiredRoles.some((role) => userRoles.includes(role));
  }
}
