import { Injectable } from '@angular/core';


export interface Pais {
  id: number;
  category: string;
  value: number;
  seleccionado: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class PieChartService {
  filtroData: Pais[] = [];

  constructor() { }

  dataPaises: Pais[] = [
    {
      id: 1,
      category: "Lithuania",
      value: 501.9,
      seleccionado: false
    }, {
      id: 2,
      category: "Czechia",
      value: 301.9,
      seleccionado: false
    }, {
      id: 3,
      category: "Ireland",
      value: 201.1,
      seleccionado: false
    }, {
      id: 4,
      category: "Germany",
      value: 165.8,
      seleccionado: false
    }, {
      id: 5,
      category: "Mexico",
      value: 200,
      seleccionado: false
    }, {
      id: 6,
      category: "Italy",
      value: 190.1,
      seleccionado: false
    }, {
      id: 7,
      category: "EUA",
      value: 165.8,
      seleccionado: false
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
