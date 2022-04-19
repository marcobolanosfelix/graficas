import { Injectable } from '@angular/core';


export interface Pais {
  category: string;
  value: number;
}

@Injectable({
  providedIn: 'root'
})
export class PieChartService {
  filtroData: Pais[] = [];

  constructor() { }

  private dataPaises: Pais[] = [
    {
      category: "Lithuania",
      value: 501.9
    }, {
      category: "Czechia",
      value: 301.9
    }, {
      category: "Ireland",
      value: 201.1
    }, {
      category: "Germany",
      value: 165.8
    }, {
      category: "Mexico",
      value: 200
    }, {
      category: "Italy",
      value: 190.1
    }, {
      category: "EUA",
      value: 165.8
    }
  ];


  getData() {
    return this.dataPaises;
  }

  getFilterData() {
    return this.filtroData;
  }

  resetFilter() {
    this.filtroData = [];
  }
  

}
