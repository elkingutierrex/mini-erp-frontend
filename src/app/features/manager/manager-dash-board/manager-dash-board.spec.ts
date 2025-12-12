import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerDashBoard } from './manager-dash-board';

describe('ManagerDashBoard', () => {
  let component: ManagerDashBoard;
  let fixture: ComponentFixture<ManagerDashBoard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerDashBoard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerDashBoard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
