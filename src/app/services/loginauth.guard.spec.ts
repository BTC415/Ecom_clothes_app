import { TestBed } from '@angular/core/testing';

import { LoginauthGuard } from './loginauth.guard';

describe('LoginauthGuard', () => {
  let guard: LoginauthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LoginauthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
