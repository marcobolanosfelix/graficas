import { Component, OnInit, Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { PieChartService } from 'src/app/services/pie-chart.service';
import { FormBuilder } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';

import { MatListOption } from '@angular/material/list';

import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";


@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {
  private root: am5.Root | undefined; 
  public pieChartForm: any;
  public datos: any;
  paisesNames: string[] = [];


  ngOnInit(): void {
    //this.crearGrafica();
    this.initForm();
  }

  initForm(){
    this.datos = this.pieChartService.getData();

    this.datos.forEach((pais: any) => {
      this.paisesNames.push(pais.category) //Cambiar la variable en caso de fallar
    });
    
  }

  // Run the function only in the browser
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  ngOnDestroy() {
    // Clean up chart when the component is removed
    this.browserOnly(() => {
      if (this.root) {
        this.root.dispose();
      }
    });
  }

  constructor(
    @Inject(PLATFORM_ID) private platformId: any, 
    private zone: NgZone,
    private pieChartService: PieChartService,
    private fb: FormBuilder
  ) { }

  sendPaises(){
    this.ngOnDestroy();
    this.crearGrafica();
  }

  crearGrafica() {
    let root = am5.Root.new("chart-pie-div");
    let chart = root.container.children.push(
      am5percent.PieChart.new(root, {})
    );

    let series = chart.series.push(
      am5percent.PieSeries.new(root, {
        name: "Series",
        categoryField: "category",
        valueField: "value"
      })
    );

    let data = this.pieChartService.getFilterData();

    series.data.setAll(data);

    let legend = chart.children.push(am5.Legend.new(root, {
      centerX: am5.percent(50),
      x: am5.percent(50),
      layout: root.horizontalLayout
    }));
  
    legend.data.setAll(series.dataItems);
    
    this.root = root;
  }

  onGroupsChange(options: MatListOption[]) {
    this.pieChartService.resetFilter();

    // map these MatListOptions to their values
    console.log(options.map(o => o.value));
    
    options.forEach((categorySelected: any) => {
      //console.log("COMPARANDO 1:"+categorySelected.value);
      this.datos.forEach((categoryData: any) => {
       // console.log("COMPARANDO 2:"+categoryData.category);
        if(categorySelected.value == categoryData.category){
         // console.log("ENCONTRE UNO IGUAL")
        this.pieChartService.filtroData.push(categoryData);
        }
      });
    });
    console.log("FILTRODATA: " + this.pieChartService.filtroData);
  }
 

}
