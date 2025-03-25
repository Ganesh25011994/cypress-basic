import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonExistingLeadsComponent } from './common-existing-leads.component';

describe('CommonExistingLeadsComponent', () => {
  let component: CommonExistingLeadsComponent;
  let fixture: ComponentFixture<CommonExistingLeadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonExistingLeadsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonExistingLeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
