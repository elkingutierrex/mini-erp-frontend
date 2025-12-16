import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Navbar } from './shared/components/navbar/navbar';


@Component({
  standalone: true,
  imports: [RouterModule, RouterOutlet, Navbar],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {}
