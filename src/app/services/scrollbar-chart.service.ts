import { Injectable } from '@angular/core';
import * as am5 from "@amcharts/amcharts5";


@Injectable({
  providedIn: 'root'
})
export class ScrollbarChartService {
  public dias: number = 0;
  public fecha: any;

  constructor() { }


  crearDatas(start: number, end: number) {
    // Generate random data
    var date = new Date();
    date.setHours(0, 0, 0, 0);
    var value = 100;

    function generateData() {
      value = Math.round((Math.random() * 10 - 5) + value);
      am5.time.add(date, "day", 1);
      return {
        date: date.getTime(),
        value: value
      };
    }

    function generateDatas(count: number) {
      var data = [];
      for (var i = 0; i < count; ++i) {
        data.push(generateData());
      }
      return data;
    }

    return generateDatas(end - start);
}


}
