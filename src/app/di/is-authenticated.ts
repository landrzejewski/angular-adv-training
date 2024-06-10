import {inject} from "@angular/core";
import {AUTH_SERVICE} from "./tokens";

export function isAuthenticated(): boolean {
  const authService = inject(AUTH_SERVICE); // nie będzie działać, jeśli funkcja nie zostanie zawołana w ramach injection context
  return authService.isAuthenticated();
}
