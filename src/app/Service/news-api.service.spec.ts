import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { NewsApiService } from './news-api.service';

describe('NewsApiService', () => {
  let service: NewsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NewsApiService]
    });
    service = TestBed.inject(NewsApiService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
