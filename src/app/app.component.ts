import { Component } from '@angular/core';
import { MainComponent } from './components/main/main.component';
import { HeaderComponent } from './components/header/header.component';
/* import './main.js'; */

@Component({
  selector: 'app-root',
  imports: [MainComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
