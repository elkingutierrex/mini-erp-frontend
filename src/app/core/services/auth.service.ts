import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, throwError } from 'rxjs';
import { User } from '../models/user.model';

import { environment } from '../../../environments/environment';
import { MockDbService } from './mock-db.service';


@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUser?: User;
  private readonly apiUrl = `${environment.apiUrl}/auth`;

  constructor(
    private http: HttpClient,
    private db: MockDbService
  ) {}

  login(email: string, password: string): Observable<User> {
    if (environment.useMock) {
      return this.db.getUsers().pipe(
        map(users => {
          const u = users.find(x => x.email === email && x.password === password);
          if (!u) throw new Error('Credenciales inválidas');

          const accessToken = btoa(`${u.id}:${u.email}:${Date.now()}`);
          this.currentUser = { ...u, accessToken };
          console.log(this.currentUser);
          return this.currentUser;
        })
      );
    }

    // API REAL
    return this.http.post<User>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        map(user => {
          this.currentUser = user;
          console.log(this.currentUser);

          sessionStorage.setItem('id', this.currentUser.user?.id!);
          sessionStorage.setItem('accessToken', this.currentUser.accessToken!);
          console.log('este es el accessToken', this.currentUser.accessToken!);

          return user;
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
    return !!this.currentUser && this.currentUser.user.permissions.includes(permission) ;
  }

  getToken(): string | undefined {
    return this.currentUser?.accessToken;
  }
}
