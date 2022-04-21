import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChartComponent } from './chart/chart.component';
import { HomeComponent } from './components/home/home.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { ScrollbarChartComponent } from './components/scrollbar-chart/scrollbar-chart.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent 
  },
  {
    path: 'chart-graphic',
    component: ChartComponent,
  },
  {
    path: 'pie-chart',
    component: PieChartComponent
  },
  {
    path: 'scrollbar-chart',
    component: ScrollbarChartComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
