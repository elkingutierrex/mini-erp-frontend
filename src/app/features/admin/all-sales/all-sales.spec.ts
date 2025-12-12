import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSales } from './all-sales';

describe('AllSales', () => {
  let component: AllSales;
  let fixture: ComponentFixture<AllSales>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllSales]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllSales);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
