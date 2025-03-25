import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-ujji-logo',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './ujji-logo.component.html',
  styleUrl: './ujji-logo.component.scss'
})
export class UjjiLogoComponent {

}
