import { FormBuilder, FormControl } from '@angular/forms';
import { Component, OnInit, Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { PieChartService } from 'src/app/services/pie-chart.service';
import { isPlatformBrowser } from '@angular/common';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

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
  //Buscador
  public selectedItems: any = [];
  public dropdownSettings: IDropdownSettings = {};
  public dataPaises: any = []; //Sustituye a "dropdownList"
  public seleccionados: any = []; //Toma los paises seleccionados para graficarlos
  public countryFiltrado: any;


  constructor(
    @Inject(PLATFORM_ID) private platformId: any, 
    private zone: NgZone,
    private pieChartService: PieChartService,
  ) { }
    
  ngOnInit(): void {
    this.initForm();
    this.getDataFiltrado();
  }

  getDataFiltrado() {
    this.dataPaises = this.pieChartService.getData();
 
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'category',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true
    };
  }

  //Agrega los paises al arreglo para visualizar en la Grafica
  onItemSelect(item: any) {
    console.log("enabled: " + item.id + " - " + item.category);
    this.seleccionados.push(this.takePais(item));
    console.log("SELECCIONADOS: " + this.seleccionados)
    
    this.seleccionados.forEach((pais: any) => {
      console.log(pais)
    });

  }

  //Agrega todos los paises al arreglo para visualizar en la Grafica
  onSelectAll(items: any) {
    console.log(items);
    this.seleccionados = this.datos;
  }

  //Eliminar los paises al arreglo para visualizar en la Grafica
  onItemDeSelect(item: any) {
    console.log("disabled: " + item.category);
    this.dataPaises.forEach((pais: any) => {
      if (item.category == pais.category) {
        this.countryFiltrado = this.takePais(item);
        console.log("countryFiltrado: " + this.countryFiltrado)
        var nuevo = this.seleccionados.filter((elemento: any) => elemento.category !== this.countryFiltrado.category);
        this.seleccionados = nuevo;
      }
    });
  }


  initForm(){
    this.datos = this.pieChartService.getData();

    this.datos.forEach((pais: any) => {
      this.paisesNames.push(pais.category); //Cambiar la variable en caso de fallar
    });

  }

  takePais(item: any) {
    let country = null
    this.dataPaises.forEach((countryData: any) => {
      if (item.category == countryData.category) {
        country = countryData;
      }
    });
    return country;
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

    let data = this.seleccionados; //Modificado
    console.log("DATA: " + data)

    series.data.setAll(data);

    let legend = chart.children.push(am5.Legend.new(root, {
      centerX: am5.percent(50),
      x: am5.percent(50),
      layout: root.horizontalLayout
    }));
  
    legend.data.setAll(series.dataItems);
    
    this.root = root;
  }

 

}
