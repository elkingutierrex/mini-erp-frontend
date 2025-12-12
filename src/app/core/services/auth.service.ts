import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { MockDbService } from './mock-db.service';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUser?: User;

  constructor(private db: MockDbService) {}

  login(email: string, password: string): Observable<User> {
    return this.db.getUsers().pipe(
      map(users => {
        const u = users.find(x => x.email === email && x.password === password);
        if (!u) throw new Error('Credenciales inválidas');
        // mock token
        const token = btoa(`${u.id}:${u.email}:${Date.now()}`);
        this.currentUser = { ...u, token };
        return this.currentUser;
      })
    );
  }

  logout() {
    this.currentUser = undefined;
  }

  getCurrentUser(): User | undefined {
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    return !!this.currentUser;
  }

  hasPermission(permission: string): boolean {
    return !!this.currentUser && this.currentUser.permissions.includes(permission);
  }

  getToken(): string | undefined {
    return this.currentUser?.token;
  }
}
