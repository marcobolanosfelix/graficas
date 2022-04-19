import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollbarChartComponent } from './scrollbar-chart.component';

describe('ScrollbarChartComponent', () => {
  let component: ScrollbarChartComponent;
  let fixture: ComponentFixture<ScrollbarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScrollbarChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrollbarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
