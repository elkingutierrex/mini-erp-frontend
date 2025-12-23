import { TestBed } from '@angular/core/testing';

import { ProductsSerrvice } from './products.serrvice';

describe('ProductsSerrvice', () => {
  let service: ProductsSerrvice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsSerrvice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
