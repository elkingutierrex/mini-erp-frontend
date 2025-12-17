import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Logo } from '../logo/logo';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, Logo],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {

   isOpen = signal(false);

  toggle() {
    this.isOpen.update(v => !v);
  }

  close() {
    this.isOpen.set(false);
  }

}
