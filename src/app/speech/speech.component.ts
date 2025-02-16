import { CommonModule } from '@angular/common';
import { Component, NgZone } from '@angular/core';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-speech',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [],
  templateUrl: './speech.component.html',
  styleUrl: './speech.component.css'
})
export class SpeechComponent {
  selectedLanguage = 'en-US';

  speechRecognition: any;
  isListening = false;
  transcript = '';

  constructor(private ngZone: NgZone) {}

  startRecognition() {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      alert("Your browser does not support speech recognition.");
      return;
    }

    this.speechRecognition = new SpeechRecognition();
    this.speechRecognition.lang = this.selectedLanguage;
    this.speechRecognition.continuous = false;
    this.speechRecognition.interimResults = false;

    this.speechRecognition.onstart = () => {
      this.isListening = true;
      console.log("Speech recognition started...");
    };

    this.speechRecognition.onresult = (event: any) => {
      const result = event.results[0][0].transcript;
      console.log("Speech recognized:", result);

      this.ngZone.run(() => {
        this.transcript += result + '. ';
        this.isListening = false;
      });
    };

    this.speechRecognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      this.ngZone.run(() => {
        this.isListening = false;
      });
    };

    this.speechRecognition.onend = () => {
      console.log("Speech recognition ended.");
      this.ngZone.run(() => {
        this.isListening = false;
      });
    };

    this.speechRecognition.start();
  }

  stopRecognition() {
    if (this.speechRecognition) {
      this.speechRecognition.stop();
      this.isListening = false;
    }
  }
}
