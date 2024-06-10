import {CanActivateFn, Router} from "@angular/router";
import {inject} from "@angular/core";
import {AUTH_SERVICE} from "../di/tokens";
import {map, of} from "rxjs";

export const authGuard: CanActivateFn = () => {
  const authService = inject(AUTH_SERVICE);
  const router = inject(Router);
  return of(authService.isAuthenticated())
    .pipe(
      map(status => status || router.createUrlTree(['']))
    );
}
