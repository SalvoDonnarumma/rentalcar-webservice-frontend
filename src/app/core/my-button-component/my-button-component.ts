import { Component, effect, EventEmitter, input, model, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-button-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-button-component.html',
  styleUrl: './my-button-component.css',
})
export class MyButtonComponent {
  // INPUT con Signal
  readonly buttonConfig = input<MyButtonConfig>();

  @Output()
  buttonClicked = new EventEmitter<void>();

  onClick(): void {
    this.buttonClicked.emit(); 
  }
}


export class MyButtonConfig {
  customClass: string | undefined;
  text: string | undefined;
  icon: string | undefined;
}
