import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthsecureGuard } from './authsecure.guard';

describe('AuthsecureGuard', () => {
  let guard: AuthsecureGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,RouterTestingModule],
    });
    guard = TestBed.inject(AuthsecureGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
