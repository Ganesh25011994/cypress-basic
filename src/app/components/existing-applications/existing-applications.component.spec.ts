import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingApplicationsComponent } from './existing-applications.component';

describe('ExistingApplicationsComponent', () => {
  let component: ExistingApplicationsComponent;
  let fixture: ComponentFixture<ExistingApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExistingApplicationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExistingApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
