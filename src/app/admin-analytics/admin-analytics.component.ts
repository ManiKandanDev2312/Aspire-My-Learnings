import { Component, ViewChild } from '@angular/core';
import { ChartComponent,ApexAxisChartSeries,ApexChart,ApexXAxis,ApexTitleSubtitle, ApexResponsive, ApexDataLabels, ApexNonAxisChartSeries, ApexLegend, ApexStroke} from "ng-apexcharts";
import { AdminDatasService } from '../admin-datas.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};
export type ChartOptions1 = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  legend:ApexLegend;
  stroke:ApexStroke;
};

@Component({
  selector: 'app-admin-analytics',
  templateUrl: './admin-analytics.component.html',
  styleUrls: ['./admin-analytics.component.css']
})
export class AdminAnalyticsComponent {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;
  public chartOptions1!: Partial<ChartOptions1>;

  HotelDetails:any=[];
  hotelNames:any=[];

  constructor(private admindata:AdminDatasService) {

    this.admindata.fetchHotels().subscribe(hotels=>{
      this.HotelDetails=hotels;
      for(var i=0;i<this.HotelDetails.length;i++){
        this.hotelNames[i]=this.HotelDetails[i].hotelname;
      }
      this.pieChart();
    })
    this.chartOptions = {
      series: [
        {
          name: "My-series",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }
      ],
      chart: {
        height: 450,
        width: 400,
        type: "bar",
        toolbar:{
          show:false
        }
      },
      title: {
        text: "My First Angular Chart"
      },
      xaxis: {
        categories: ["Jan", "Feb",  "Mar",  "Apr",  "May",  "Jun",  "Jul",  "Aug", "Sep"]
      }
    };

    
  }


  pieChart(){
    this.chartOptions1 = {
      series: [45,54,78,53,49,50,45,54,78,53,49,50,45,54,78,53],
      chart: {
        width: 580,
        type: "pie"
      },
      labels: this.hotelNames,
      legend:{
        show:false
      },
      stroke:{
        show:false
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }
  }
