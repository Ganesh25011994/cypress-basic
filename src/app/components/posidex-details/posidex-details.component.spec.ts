import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosidexDetailsComponent } from './posidex-details.component';

describe('PosidexDetailsComponent', () => {
  let component: PosidexDetailsComponent;
  let fixture: ComponentFixture<PosidexDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PosidexDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PosidexDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
