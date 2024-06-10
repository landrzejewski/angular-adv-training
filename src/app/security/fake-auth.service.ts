import {AuthService} from "./auth.service";

export class FakeAuthService implements AuthService{

  login(username: string, password: string): void {
  }

  logout(): void {
  }

  isAuthenticated(): boolean {
    return true;
  }

}
