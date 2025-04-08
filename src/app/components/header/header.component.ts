import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from '../../modules/sharedModule/shared-module';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

 @Input() pagename: string;

  toggleMenu() {
    console.log('Menu clicked');
  }

  exitApp() {
    console.log('Exit clicked');
  }

}
