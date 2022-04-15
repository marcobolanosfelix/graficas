import { Component, OnInit } from '@angular/core';
import { Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';

// amCharts imports
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { MatListOption } from '@angular/material/list';
import { ChartServiceService } from '../services/chart-service.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  public ChartForm: any
  private root: am5.Root | undefined;
  serie1=""
  serie2=""
  public datos: any
  categoria:any=""
  typesOfShoes: string[] =[];


  constructor(
    @Inject(PLATFORM_ID) private platformId: any, 
    private zone: NgZone, 
    private fb: FormBuilder, 
    private chartService: ChartServiceService
  ) { }

   // Run the function only in the browser
   browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  ngAfterViewInit() {
  }

  crearGrafica(){
    
    // Chart code goes in here
    this.browserOnly(() => {
      let root = am5.Root.new("chartdiv");

      root.setThemes([am5themes_Animated.new(root)]);

      let chart = root.container.children.push(
        am5xy.XYChart.new(root, {
          panY: false,
          layout: root.verticalLayout
        })
      );

      // Define data
      let data = this.chartService.getData();
     

      // Create Y-axis
      let yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
          renderer: am5xy.AxisRendererY.new(root, {})
        })
      );

      // Create X-Axis
      let xAxis = chart.xAxes.push(
        am5xy.CategoryAxis.new(root, {
          renderer: am5xy.AxisRendererX.new(root, {}),
          categoryField: "category"
        })
      );
      xAxis.data.setAll(data);

      // Create series
      let series1 = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: this.serie1,
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "value1",
          categoryXField: "category"
        })
      );
      series1.data.setAll(data);

      let series2 = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: this.serie2,
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "value2",
          categoryXField: "category"
        })
      );
      series2.data.setAll(data);

      // Add legend
      let legend = chart.children.push(am5.Legend.new(root, {}));
      legend.data.setAll(chart.series.values);

      // Add cursor
      chart.set("cursor", am5xy.XYCursor.new(root, {}));

      this.root = root;
    });
  }

  ngOnDestroy() {
    // Clean up chart when the component is removed
    this.browserOnly(() => {
      if (this.root) {
        this.root.dispose();
      }
    });
  }

  ngOnInit(): void {
    this.initForm();
  }

  sendSeries(){
    this.serie1 = this.ChartForm.get('serie1').value
    this.serie2 = this.ChartForm.get('serie2').value

    this.ngOnDestroy();
    this.crearGrafica();
  }

  initForm(){
    this.ChartForm =this.fb.group({//De este formulario activo tomaras los datos que escriban en los campos
      serie1: [''],
      serie2: ['']
    });
    this.datos=this.chartService.getData();

    this.datos.forEach((categoria:any) => {
      this.typesOfShoes.push(categoria.category)
    });
    
  }

  onGroupsChange(options: MatListOption[]) {
    // map these MatListOptions to their values
    console.log(options.map(o => o.value));
  }

}