import { CommonModule } from '@angular/common';
import { Component, Type } from '@angular/core';
import { PermanentAddressComponent } from '../permanent-address/permanent-address.component';
import { PresentAddressComponent } from '../present-address/present-address.component';
@Component({
  selector: 'app-address-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './address-details.component.html',
  styleUrl: './address-details.component.scss'
})
export class AddressDetailsComponent {
  selectedTab = 0;

  tabs: { label: string; component: Type<any> }[] = [
    { label: 'Permanent', component: PermanentAddressComponent },
    { label: 'Present', component: PresentAddressComponent },
  ];

  selectTab(index: number) {
    this.selectedTab = index;
  }
}
