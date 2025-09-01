import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonDemo } from './button-demo/button-demo.component';
import { Example } from './example/example.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonDemo, Example],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('crypto');
}
