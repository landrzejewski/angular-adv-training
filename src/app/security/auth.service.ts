export interface AuthService {

  login(username: string, password: string): void;

  logout(): void;

  isAuthenticated(): boolean;

}
