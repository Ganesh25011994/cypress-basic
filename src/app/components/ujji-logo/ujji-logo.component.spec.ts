import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UjjiLogoComponent } from './ujji-logo.component';

describe('UjjiLogoComponent', () => {
  let component: UjjiLogoComponent;
  let fixture: ComponentFixture<UjjiLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UjjiLogoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UjjiLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
