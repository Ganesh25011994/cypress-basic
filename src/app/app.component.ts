import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ProductsService } from './services/products.service'
import { FormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(public router: Router) {
    let logindata = localStorage.getItem('username')
    let personaldata = localStorage.getItem('personalgo')

      if (logindata && this.router.url == '/') {
        if (personaldata) {
          this.router.navigate(['/personal'], {
            skipLocationChange: true,
            replaceUrl: true,
          });
          
        } else {
          this.router.navigate(['/mpin'], {
            skipLocationChange: true,
            replaceUrl: true,
          });
        }
        // this.router.navigateByUrl('mpin')
        
      } else {
        // this.router.navigateByUrl('login')
        this.router.navigate(['/login'], {
          skipLocationChange: true,
          replaceUrl: true,
        });
      }
    
    
  }
  
}
