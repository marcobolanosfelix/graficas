import { Injectable } from '@angular/core';


export interface Pais {
  category: string;
  value: number;
  seleccionado: string;
}

@Injectable({
  providedIn: 'root'
})
export class PieChartService {
  filtroData: Pais[] = [];

  constructor() { }

  dataPaises: Pais[] = [
    {
      category: "Lithuania",
      value: 501.9,
      seleccionado: "false"
    }, {
      category: "Czechia",
      value: 301.9,
      seleccionado: "false"
    }, {
      category: "Ireland",
      value: 201.1,
      seleccionado: "false"
    }, {
      category: "Germany",
      value: 165.8,
      seleccionado: "false"
    }, {
      category: "Mexico",
      value: 200,
      seleccionado: "false"
    }, {
      category: "Italy",
      value: 190.1,
      seleccionado: "false"
    }, {
      category: "EUA",
      value: 165.8,
      seleccionado: "false"
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
