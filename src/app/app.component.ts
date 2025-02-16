import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SpeechComponent } from "./speech/speech.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SpeechComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'client';
}
