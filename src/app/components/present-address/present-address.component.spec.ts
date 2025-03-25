import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentAddressComponent } from './present-address.component';

describe('PresentAddressComponent', () => {
  let component: PresentAddressComponent;
  let fixture: ComponentFixture<PresentAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PresentAddressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PresentAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
