import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SharedModule } from '../../modules/sharedModule/shared-module';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-choose-customer',
  standalone: true,
  imports: [RouterOutlet, CommonModule, SharedModule, MatIconModule],
  templateUrl: './choose-customer.component.html',
  styleUrl: './choose-customer.component.scss'
})
export class ChooseCustomerComponent {
  constructor(public router: Router) {

  }

  openNewCustomer() {
    this.router.navigateByUrl('/new-customer')
  }
  

}
