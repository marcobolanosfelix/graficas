import { TestBed } from '@angular/core/testing';

import { ScrollbarChartService } from './scrollbar-chart.service';

describe('ScrollbarChartService', () => {
  let service: ScrollbarChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScrollbarChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
