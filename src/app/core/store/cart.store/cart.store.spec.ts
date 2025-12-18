import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartStore } from './cart.store';

describe('CartStore', () => {
  let component: CartStore;
  let fixture: ComponentFixture<CartStore>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartStore]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartStore);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
