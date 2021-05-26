import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
HC_exporting(Highcharts);

@Component({
  selector: 'app-line-graph',
  templateUrl: './line-graph.component.html',
  styleUrls: ['./line-graph.component.scss']
})
export class LineGraphComponent implements OnInit {
  chartOptions: {};

  Highcharts = Highcharts

  constructor() { }

  ngOnInit(): void {
    this.chartOptions = {
      chart: {
          type: 'area'
      },
      title: {
          text: 'Overal Procurement Services '
      },
      subtitle: {
          text: 'Source: Procurement API'
      },
      xAxis: {
          categories: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July','August','September','Octoper','November','Dec'],
          tickmarkPlacement: 'on',
          title: {
              enabled: false
          }
      },
      yAxis: {
          title: {
              
          },
          labels: {
              formatter: function () {
                  return this.value / 1000;
              }
          }
      },
      tooltip: {
          split: true,
          valueSuffix: ' '
      },
      plotOptions: {
          area: {
              stacking: 'normal',
              lineColor: '#666666',
              lineWidth: 1,
              marker: {
                  lineWidth: 1,
                  lineColor: '#666666'
              }
          }
      },
      series: [{
          name: 'Employees',
          data: [502, 635, 809, 947, 1402, 3634, 5268,]
      }, {
          name: 'Store',
          data: [106, 107, 111, 133, 221, 767, 1766]
      }, {
          name: 'Orders',
          data: [163, 203, 276, 408, 547, 729, 628]
      }, {
          name: 'Staff Requests',
          data: [18, 31, 54, 156, 339, 818, 1201]
      }, {
          name: 'Suppliers',
          data: [2, 2, 2, 6, 13, 30, 46]
      }]

  };

  HC_exporting(Highcharts);


  }

}
