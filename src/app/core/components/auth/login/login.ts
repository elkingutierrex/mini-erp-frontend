import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Logo } from '../../../../shared/components/logo/logo';
import { AuthService } from '../../../services/auth.service';


@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, FormsModule, Logo],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  email = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  onLogin() {
    this.auth.login(this.email, this.password).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => this.error = (err && err.message) || 'Error'
    });
  }
}
