import { Injectable } from '@angular/core';
import * as am5 from "@amcharts/amcharts5";


@Injectable({
  providedIn: 'root'
})
export class ScrollbarChartService {
  public dias: number = 0;
  public fecha: any;

  constructor() { }


  crearDatas(start: Date, end: Date) {
    // Generate random data
    var date = new Date();
    start.setDate(start.getDate() - 1); //Decrementa un día a la fecha inicial ya que se adelanta un día al indicado en el calendario.
    date = start;
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

    var fechaInicio = new Date(start).getTime();
    var fechaFin    = new Date(end).getTime();
    var diff = fechaFin - fechaInicio;
    var diferencias = diff / (1000*60*60*24);

    return generateDatas(diferencias);
}


}
