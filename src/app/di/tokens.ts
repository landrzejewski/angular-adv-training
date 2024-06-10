import {InjectionToken} from "@angular/core";
import {AuthService} from "../security/auth.service";

export const AUTH_SERVICE = new InjectionToken<AuthService>('authService');
