import { Injectable } from '@angular/core';

export interface Category {
  category: string;
  value1: number;
  value2: number;
}

@Injectable({
  providedIn: 'root'
})
export class ChartServiceService {

  constructor() { }

  private data: Category[] = [
    {
      category: "Marketing",
      value1: 1000,
      value2: 588
    },
    {
      category: "Research",
      value1: 1200,
      value2: 1800
    },
    {
      category: "Sales",
      value1: 850,
      value2: 1230
    },
    {
      category: "Systems",
      value1: 850,
      value2: 1230
    }
  ];


  getData() {
    return this.data;
  }

}
