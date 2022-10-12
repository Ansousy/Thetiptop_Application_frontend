import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { JouerService } from './jouer.service';

describe('JouerService', () => {
  let service: JouerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,RouterTestingModule],
    });
    service = TestBed.inject(JouerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
