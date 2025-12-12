import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesCrud } from './roles-crud';

describe('RolesCrud', () => {
  let component: RolesCrud;
  let fixture: ComponentFixture<RolesCrud>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RolesCrud]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RolesCrud);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
