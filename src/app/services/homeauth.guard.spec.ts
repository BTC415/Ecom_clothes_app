import { TestBed } from '@angular/core/testing';

import { HomeauthGuard } from './homeauth.guard';

describe('HomeauthGuard', () => {
  let guard: HomeauthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(HomeauthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
