import { Component, OnInit } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/js/src/utilities/';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips/js/';
import {CommonModule} from '@angular/common';
import {UserService} from '../../shared/user.service';
import {Observable} from 'rxjs/Observable';


@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  trainer_first_name = localStorage.getItem('first_name');
  trainer_last_name = localStorage.getItem('last_name');
  trainer_institution = '';
  trainer_starting_year = '';
  arr_month: string[] = new Array(28);

  current_patient =
    {
      first_name : '',
      last_name : '',
      weight : '',
      height : '',
      fat_percentage : '',
      mass_weight : '',
      visceral_fat : '',
      physique_rating : '',
      metabolic_age : '',
      body_water : ''
    };

  patient: any;

  patients: any;

  numberOfPatients: any;

  barChartData = [
    {data: [10000, 9000, 10000, 11000], label: 'Total Calories'},
    {data: [2500  , 3000, 5000, 6000], label: 'Activity Calories'}
  ];

  // lineChart
  lineChartData = [
    {data: [10000, 9000, 10000, 11000], label: 'Weight'},
    {data: [10000, 9000, 10000, 11000], label: 'Body Fat'},
    {data: [10000, 9000, 10000, 11000], label: 'Muscal Mass'}
  ];


  constructor(private userService: UserService) {}

  // Converts the dates to our format
  public convertDate(date) {
    date.setDate(date.getDate());
    let dd = date.getDate();
    let mm = date.getMonth() + 1;

    let yyyy = date.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }

    let today = yyyy + '-' + mm + '-' + dd;
    return today;
  }

  // Get dates of the last month
  public thirtyLastDays() {
    let j = 0;
    for (let i = 28; i > 0; i--) {
      let date = new Date();
      date.setDate(date.getDate() - i);
      this.arr_month[j++] = this.convertDate(date);
    }
  }

  public caloriesByInterval(data, from, to) {
    let numberOfDays: number =  0;
    let calories: number = 0;
    let activeCalories: number = 0;

    for (let i = from; i < to; i++) {
      let current_date = this.arr_month[i];
      for (let j = 0; j < data.length; j++) {
        if (data[j].date === current_date) {
          numberOfDays = numberOfDays + 1;
          calories = calories + data[j].calories;
          activeCalories = activeCalories + data[j].active_calories;
          break;
        }
      }
    }

    return [Math.round(calories / numberOfDays), Math.round(activeCalories / numberOfDays)];
  }

  public calculateWeeklyCalories(data) {
    let week1 = this.caloriesByInterval(data,0,7);
    let week2 = this.caloriesByInterval(data,7,14);
    let week3 = this.caloriesByInterval(data,14,21);
    let week4 = this.caloriesByInterval(data,21,28);

    // return [week1, week2, week3, week4];

    this.barChartData = [
      {data: [week1[0], week2[0], week3[0], week4[0]], label: 'Total Calories'},
      {data: [week1[1]  , week2[1], week3[1], week4[1]], label: 'Activity Calories'}
    ];
  }

  public measurementByInterval(data, from, to) {
    let numberOfDays: number =  0;
    let weight: number = 0;
    let fat_percentage: number = 0;
    let mass_weight: number = 0;

    for (let i = from; i < to; i++) {
      let current_date = this.arr_month[i];
      for (let j = 0; j < data.length; j++) {
        data[j].date = data[j].measurement_time.split(' ')[0];
        if (data[j].date === current_date) {
          numberOfDays = numberOfDays + 1;
          weight = weight + data[j].weight;
          fat_percentage = fat_percentage + data[j].fat_percentage;
          mass_weight = mass_weight + data[j].mass_weight;
          break;
        }
      }
    }

    return [Math.round(weight / numberOfDays), Math.round(fat_percentage / numberOfDays), Math.round(mass_weight / numberOfDays)];
  }

  public calculateWeeklyMeasurement(data) {
    let week1 = this.measurementByInterval(data,0,7);
    let week2 = this.measurementByInterval(data,7,14);
    let week3 = this.measurementByInterval(data,14,21);
    let week4 = this.measurementByInterval(data,21,28);

    this.lineChartData = [
      {data: [week1[0], week2[0], week3[0], week4[0]], label: 'Weight'},
      {data: [week1[1], week2[1], week3[1], week4[1]], label: 'Body Fat'},
      {data: [week1[2], week2[2], week3[2], week4[2]], label: 'Muscal Mass'}
    ];
  }

  public updatePatientGraphs(patient_email) {
    // Get first patient activity
    this.userService.getPatientActivity(patient_email)
      .subscribe((data: any) => {
          if (data.error == true) {
            alert('Error!');
          } else {
            console.log(data);
            this.calculateWeeklyCalories(data);
          }
        },
        err => {
          console.log('Error: ' + err.error);
        });

    // Get first patient scale
    this.userService.getPatientScales(patient_email)
      .subscribe((data: any) => {
          if (data.error == true) {
            alert('Error!');
          } else {
            let lastMeasure = data[data.length - 1];
            this.current_patient.weight = lastMeasure.weight;
            this.current_patient.body_water = lastMeasure.body_water;
            this.current_patient.fat_percentage = lastMeasure.fat_percentage;
            this.current_patient.mass_weight = lastMeasure.mass_weight;
            this.current_patient.metabolic_age = lastMeasure.metabolic_age;
            this.current_patient.physique_rating = lastMeasure.physique_rating;
            this.current_patient.visceral_fat = lastMeasure.visceral_fat;
            this.calculateWeeklyMeasurement(data);
          }
        },
        err => {
          console.log('Error: ' + err.error);
        });
  }

  ngOnInit() {
    this.thirtyLastDays();
    this.userService.getInfo(localStorage.getItem('email'))
      .subscribe((data: any) => {
          if (data.error == true){
            console.log('error');
          } else {
            // console.log(data);
            this.trainer_institution = data.institution;
          }
        },
        err => {
          console.log(err);
          console.log('at error!');
        });
    // Get all patients
    this.userService.getAllPatients(localStorage.getItem('email'))
      .subscribe((data: any) => {
          if (data.error == true) {
            alert('Error!');
          } else {
            this.patients = data;
            // Initialize the data fot the first patient
            this.patient = this.patients[0];
            this.current_patient.first_name = this.patient.first_name;
            this.current_patient.last_name = this.patient.last_name;
            this.numberOfPatients = this.patients.length;
            this.updatePatientGraphs(this.patients[0].patient_email);
           }
        },
        err => {
          console.log('Error: ' + err.error);
        });

  }

  public onSelect(patient) {
    this.patient = patient;
    this.current_patient.first_name = this.patient.first_name;
    this.current_patient.last_name = this.patient.last_name;
    this.updatePatientGraphs(this.patient.patient_email);
  }

  public lineChartLabels: Array<any> = ['3 weeks ago', '2 weeks ago', 'week ago', 'this week'];
  public lineChartOptions: any = {
    animation: false,
    responsive: true
  };
  public lineChartColours: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';

  // barChart
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = ['3 weeks ago', '2 weeks ago', 'week ago', 'this week'];
  public barChartType = 'bar';
  public barChartLegend = true;

  // events
  public chartClicked(e: any): void {
    // console.log(e);
  }

  public chartHovered(e: any): void {
    // console.log(e);
  }


}
