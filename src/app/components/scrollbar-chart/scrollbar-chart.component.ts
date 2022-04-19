import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'

import * as am5 from '@amcharts/amcharts5';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5xy from '@amcharts/amcharts5/xy';

import { ScrollbarChartService } from 'src/app/services/scrollbar-chart.service';

@Component({
  selector: 'app-scrollbar-chart',
  templateUrl: './scrollbar-chart.component.html',
  styleUrls: ['./scrollbar-chart.component.scss'],
})
export class ScrollbarChartComponent implements OnInit {
  private root: am5.Root | undefined;
  public scrollbarChar: any;
  public datos: any;
  public range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  constructor(
    private scrollbarChartService: ScrollbarChartService
  ) {}

  ngOnInit(): void {
    
  }

  sendGrafica() {
    this.crearGrafica();
  }

  crearGrafica() {
    // Create root and chart
    var root = am5.Root.new('chart-scrollbar-div');

    root.setThemes([am5themes_Animated.new(root)]);

    var chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panY: false,
        wheelY: 'zoomX',
        layout: root.horizontalLayout,
      })
    );

    // Create Y-axis
    var yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    // Create X-Axis
    var xAxis: any = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        groupData: true,
        baseInterval: { timeUnit: 'day', count: 1 },
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 30,
        }),
      })
    );

    xAxis.get('dateFormats')['day'] = 'MM/dd';
    xAxis.get('periodChangeDateFormats')['day'] = 'MMMM';

    //Generar datos desde Service
    var data = this.scrollbarChartService.crearDatas(this.range.value.start, this.range.value.end);
    //console.log(this.range.value.start)
    //console.log(this.range.value.end)

    // Create series
    function createSeries(name: string, field: any) {
      var series: any = chart.series.push(
        am5xy.LineSeries.new(root, {
          name: name,
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: field,
          valueXField: 'date',
          tooltip: am5.Tooltip.new(root, {}),
        })
      );

      series.strokes.template.set('strokeWidth', 2);

      series
        .get('tooltip')
        .label.set('text', '[bold]{name}[/]\n{valueX.formatDate()}: {valueY}');
      series.data.setAll(data);

      // Pre-zoom X axis
      series.events.once('datavalidated', function (ev: any, target: any) {
        xAxis.zoomToDates(new Date(2021, 0, 1), new Date(2022, 0, 1));
      });
    }

    createSeries('Series', 'value');

    // Add cursor
    chart.set(
      'cursor',
      am5xy.XYCursor.new(root, {
        behavior: 'zoomXY',
        xAxis: xAxis,
      })
    );

    xAxis.set(
      'tooltip',
      am5.Tooltip.new(root, {
        themeTags: ['axis'],
      })
    );

    yAxis.set(
      'tooltip',
      am5.Tooltip.new(root, {
        themeTags: ['axis'],
      })
    );

    var scrollbarX = am5xy.XYChartScrollbar.new(root, {
      orientation: 'horizontal',
      height: 50,
    });

    chart.set('scrollbarX', scrollbarX);

    var sbxAxis = scrollbarX.chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        groupData: true,
        groupIntervals: [{ timeUnit: 'year', count: 1 }],
        baseInterval: { timeUnit: 'day', count: 1 },
        renderer: am5xy.AxisRendererX.new(root, {
          opposite: false,
          strokeOpacity: 0,
        }),
      })
    );

    var sbyAxis = scrollbarX.chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    var sbseries = scrollbarX.chart.series.push(
      am5xy.LineSeries.new(root, {
        xAxis: sbxAxis,
        yAxis: sbyAxis,
        valueYField: 'value',
        valueXField: 'date',
      })
    );
    sbseries.data.setAll(data);
  }


}
