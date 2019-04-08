import { TestBed } from '@angular/core/testing';

import { PasswordsService } from './passwords.service';

describe('PasswordsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PasswordsService = TestBed.get(PasswordsService);
    expect(service).toBeTruthy();
  });
});
