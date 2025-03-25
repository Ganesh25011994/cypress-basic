import { CommonModule } from '@angular/common';
import { Component, Type } from '@angular/core';
import { PersonalComponent } from '../personal/personal.component';
import { AddressDetailsComponent } from '../address-details/address-details.component';
import { KycDetailsComponent } from '../kyc-details/kyc-details.component';
import { PosidexDetailsComponent } from '../posidex-details/posidex-details.component';
@Component({
  selector: 'app-core-tabs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './core-tabs.component.html',
  styleUrl: './core-tabs.component.scss'
})
export class CoreTabsComponent {

  selectedTab = 0;

  tabs: { label: string; component: Type<any> }[] = [
    { label: 'Personal', component: PersonalComponent },
    { label: 'KYC', component: KycDetailsComponent },
    { label: 'Address', component: AddressDetailsComponent },
    { label: 'Posidex', component: PosidexDetailsComponent }
  ];

  selectTab(index: number) {
    this.selectedTab = index;
  }
}
