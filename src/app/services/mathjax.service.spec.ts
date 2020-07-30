import { TestBed } from '@angular/core/testing';

import { MathjaxService } from './mathjax.service';

describe('MathjaxService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MathjaxService = TestBed.get(MathjaxService);
    expect(service).toBeTruthy();
  });
});
