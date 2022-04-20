import { FormBuilder, FormControl } from '@angular/forms';
import { Component, OnInit, Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { Pais, PieChartService } from 'src/app/services/pie-chart.service';
import { isPlatformBrowser } from '@angular/common';
import { Subject } from 'rxjs';

import { MatListOption } from '@angular/material/list';

import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";

interface Ventana {
  id: number
  nombre: string
  seleccionado: boolean  
}

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
  paises: Pais[] = []; //Sustiruirá paisesNames: string[]
  //Buscador
  listFiltered: string[] = [];
  listFilteredBusc: Pais[] = []
  searchTerm$ = new Subject<string>();
  auxPaises: string[] = []; //Guarda los paises seleccionados
  public modulos = new FormControl();
  public ventanas: any;


  ngOnInit(): void {
    this.initForm();
  }

  constructor(
    @Inject(PLATFORM_ID) private platformId: any, 
    private zone: NgZone,
    private pieChartService: PieChartService,
    private fb: FormBuilder
  ) { }

  //Buscador
  filterList(): void {
    this.searchTerm$.subscribe(term => {
      this.listFiltered = this.paisesNames
        //.map((pais: any) => pais.category)
        .filter(item => item.toLowerCase().indexOf(term.toLowerCase()) >= 0);
    });
    
  }

  initForm(){
    this.datos = this.pieChartService.getData();
    //this.paises = this.pieChartService.getData(); //Toma todo el Data para modificar el campo "seleccionado"

    this.datos.forEach((pais: any) => {
      this.paisesNames.push(pais.category); //Cambiar la variable en caso de fallar
    });

    //Buscador
    // this.datos.forEach((pais: any) => {
    //   this.paises.push(pais); 
    // });

    this.listFiltered = this.paisesNames;
    //this.listFilteredBusc = this.paises;
    
    this.filterList();
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
          //Buscador
          categoryData.seleccionado = "true";
          
          console.log("VERDADEROS")
          console.log(categoryData.category + ": " + categoryData.seleccionado)
          return;
        } else {
          categoryData.seleccionado = "false";
          console.log("FALSOS")
          console.log(categoryData.category + ": " + categoryData.seleccionado)
          return;
        }
        
      });
    });
    console.log("FILTRODATA: " + this.pieChartService.filtroData);

    //Buscador
    //this.listFiltered = this.auxPaises;
    this.auxPaises = this.paisesNames;
    console.log("auxPaises: " + this.auxPaises)

  }

 

}
