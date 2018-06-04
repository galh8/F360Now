import { Component, OnInit, ViewChild } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/js/src/utilities/';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips/js/';
import {CommonModule} from '@angular/common';
import {UserService} from '../../shared/user.service';
import {Observable} from 'rxjs/Observable';
import {BaseChartDirective} from 'ng2-charts';


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

  numberOfPatients = 0;

  caloriesBurntData: any;

  caloriesIncomeData: any;

  lastMeasure: any;
  beforeLastMeasure: any;
  dateOfLastMeasure: any;

  dayTime = "Good Morning,";

  weightStatus = "http://grigale.grigale.com/fitness360user_app/Arrows2/none.png";
  waterStatus = "http://grigale.grigale.com/fitness360user_app/Arrows2/none.png";
  massStatus = "http://grigale.grigale.com/fitness360user_app/Arrows2/none.png";
  visceralStatus = "http://grigale.grigale.com/fitness360user_app/Arrows2/none.png";
  ageStatus = "http://grigale.grigale.com/fitness360user_app/Arrows2/none.png";
  fatStatus = "http://grigale.grigale.com/fitness360user_app/Arrows2/none.png";
  physiqueStatus = "http://grigale.grigale.com/fitness360user_app/Arrows2/none.png";

  barChartData = [
    {data: [10000, 9000, 10000, 11000], label: 'Total Calories'},
    {data: [2500  , 3000, 5000, 6000], label: 'Activity Calories'},
    {data: [2400, 2700, 4000, 6000], label: 'Steps'}
  ];

  // lineChart
  lineChartData = [
    {data: [10000, 9000, 10000, 11000], label: 'Weight'},
    {data: [10000, 9000, 10000, 11000], label: 'Body Fat'},
    {data: [10000, 9000, 10000, 11000], label: 'Muscal Mass'}
  ];

  lineChartLabels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

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
    let steps: number = 0;

    for (let i = from; i < to; i++) {
      let current_date = this.arr_month[i];
      for (let j = 0; j < data.length; j++) {
        if (data[j].date === current_date) {
          numberOfDays = numberOfDays + 1;
          calories = calories + data[j].calories;
          activeCalories = activeCalories + data[j].active_calories;
          steps = steps + data[j].steps;
          break;
        }
      }
    }

    return [Math.round(calories / numberOfDays), Math.round(activeCalories / numberOfDays), Math.round(steps / numberOfDays)];
  }

  public calculateWeeklyCaloriesBurnt(data) {
    let week1 = this.caloriesByInterval(data,0,7);
    let week2 = this.caloriesByInterval(data,7,14);
    let week3 = this.caloriesByInterval(data,14,21);
    let week4 = this.caloriesByInterval(data,21,28);

    // return [week1, week2, week3, week4];

    this.barChartData = [
      {data: [week1[0], week2[0], week3[0], week4[0]], label: 'Total Calories'},
      {data: [week1[1]  , week2[1], week3[1], week4[1]], label: 'Activity Calories'},
      {data: [week1[2]  , week2[2], week3[2], week4[2]], label: 'Steps'}
    ];
  }

  calculateIncomeCalories(data) {
    this.barChartData = [
      {data: [1,2,3,4], label: 'Total Calories'},
      {data: [1,2,3,4], label: 'Activity Calories'},
      {data: [1,2,3,4], label: 'Steps'}
    ];
  }

  public calculateMonthlyCalories(data, from, to) {
    let weight = [];
    let body_fat = [];
    let muscle_mass = [];
    let dates = [];

    for (let i = from; i < to; i++) {
      let current_date = this.arr_month[i];
      for (let j = 0; j < data.length; j++) {
        if (data[j].date === current_date) {
          dates.push(current_date);
          weight.push(data[j].weight);
          body_fat.push(data[j].fat_percentage);
          muscle_mass.push(data[j].mass_weight);
        }
      }
    }

    this.lineChartLabels.length = 0;
    for (let i = 0; i < dates.length; i++) {
      this.lineChartLabels.push(dates[i]);
    }

    this.lineChartData = [
      {data: weight, label: 'Weight'},
      {data: body_fat, label: 'Body Fat'},
      {data: muscle_mass, label: 'Muscal Mass'},
    ];


  }

  public measurementByInterval(data, from, to) {
    let numberOfDays: number =  0;
    let weight: number = 0;
    let fat_percentage: number = 0;
    let mass_weight: number = 0;
    console.log(data);
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
    this.initializeMeasureStatus();
    this.userService.getPatientActivity(patient_email)
      .subscribe((data: any) => {
          if (data.error == true) {
            alert('Error!');
          } else {
            this.caloriesBurntData = data;
            this.calculateWeeklyCaloriesBurnt(data);
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
            this.lastMeasure = data[0];
            this.beforeLastMeasure = data[1];
            this.current_patient.weight = this.lastMeasure.weight;
            this.current_patient.body_water = this.lastMeasure.body_water;
            this.current_patient.fat_percentage = this.lastMeasure.fat_percentage;
            this.current_patient.mass_weight = this.lastMeasure.mass_weight;
            this.current_patient.metabolic_age = this.lastMeasure.metabolic_age;
            this.current_patient.physique_rating = this.lastMeasure.physique_rating;
            this.current_patient.visceral_fat = this.lastMeasure.visceral_fat;
            this.calculateWeeklyMeasurement(data);
            this.calculateMonthlyCalories(data, 0, 28);
            this.updateStatus(this.lastMeasure,this.beforeLastMeasure);
            this.dateOfLastMeasure = this.lastMeasure.measurement_time;
          }
        },
        err => {
          console.log('Error: ' + err.error);
        });
  }

  ngOnInit() {
    this.initializeDaytime();
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

  public updateStatus(newMeasure, lastMeasure) {
    let greenDown = "http://grigale.grigale.com/fitness360user_app/Arrows2/greendown.png";
    let greenUp = "http://grigale.grigale.com/fitness360user_app/Arrows2/greenup.png";
    let redUp = "http://grigale.grigale.com/fitness360user_app/Arrows2/redup.png";
    let redDown = "http://grigale.grigale.com/fitness360user_app/Arrows2/reddown.png";

    if (newMeasure.weight > lastMeasure.weight) {
      this.weightStatus = redUp;
    } else if (newMeasure.weight < lastMeasure.weight) {
      this.weightStatus = greenDown;
    }

    if (newMeasure.visceral_fat > lastMeasure.visceral_fat) {
      this.visceralStatus = redUp;
    } else if (newMeasure.visceral_fat < lastMeasure.visceral_fat) {
      this.visceralStatus = greenDown;
    }

    if (newMeasure.fat_percentage > lastMeasure.fat_percentage) {
      this.fatStatus = redUp;
    } else if (newMeasure.fat_percentage < lastMeasure.fat_percentage) {
      this.fatStatus = greenDown;
    }

    if (newMeasure.body_water > lastMeasure.body_water) {
      this.waterStatus = greenUp;
    } else if (newMeasure.body_water < lastMeasure.body_water) {
      this.waterStatus = redDown;
    }

    if (newMeasure.mass_weight > lastMeasure.mass_weight) {
      this.massStatus = greenUp;
    } else if (newMeasure.mass_weight < lastMeasure.mass_weight) {
      this.massStatus = redDown;
    }

    if (newMeasure.metabolic_age > lastMeasure.metabolic_age) {
      this.ageStatus = redUp;
    } else if (newMeasure.metabolic_age < lastMeasure.metabolic_age) {
      this.ageStatus = greenDown;
    }

    if (newMeasure.physique_rating > lastMeasure.physique_rating) {
      this.ageStatus = greenUp;
    } else if (newMeasure.physique_rating < lastMeasure.physique_rating) {
      this.ageStatus = redDown;
    }

  }

  public initializeMeasureStatus() {
    this.weightStatus = "http://grigale.grigale.com/fitness360user_app/Arrows2/none.png";
    this.waterStatus = "http://grigale.grigale.com/fitness360user_app/Arrows2/none.png";
    this.massStatus = "http://grigale.grigale.com/fitness360user_app/Arrows2/none.png";
    this.visceralStatus = "http://grigale.grigale.com/fitness360user_app/Arrows2/none.png";
    this.ageStatus = "http://grigale.grigale.com/fitness360user_app/Arrows2/none.png";
    this.fatStatus = "http://grigale.grigale.com/fitness360user_app/Arrows2/none.png";
    this.physiqueStatus = "http://grigale.grigale.com/fitness360user_app/Arrows2/none.png";
  }

  public initializeDaytime() {
    let d = new Date();
    let n = d.getHours();
    if (n > 21) {
      this.dayTime = "Good night,";
    } else if (n > 17) {
      this.dayTime = "Good evening,";
    } else if (n > 12) {
      this.dayTime = "Good afternoon,";
    }
  }

  public onSelect(patient) {
    this.patient = patient;
    this.current_patient.first_name = this.patient.first_name;
    this.current_patient.last_name = this.patient.last_name;
    this.updatePatientGraphs(this.patient.patient_email);
  }

  onChangeCaloriesCharts(chartNum) {
      if (chartNum == 1) {
        this.calculateWeeklyCaloriesBurnt(this.caloriesBurntData);
      } else{
        this.calculateIncomeCalories(this.caloriesBurntData);
      }
  }

  public lineChartOptions: any = {
    animation: false,
    responsive: true
  };
  public lineChartColours: Array<any> = [
    { // green
      backgroundColor: 'rgba(119, 137, 16, 0.2)',
      borderColor: 'rgba(119, 137, 16, 1)',
      pointBackgroundColor: 'rgba(119, 137, 16, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(119, 137, 16, 0.8)'
    },
    { // blue
      backgroundColor: 'rgba(71, 148, 167, 0.2)',
      borderColor: 'rgba(71, 148, 167, 1)',
      pointBackgroundColor: 'rgba(71, 148, 167, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(71, 148, 167, 0.8)'
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


  public barChartColours: Array<any> = [
    { // green
      backgroundColor: 'rgba(119, 137, 16, 0.8)',
      borderColor: 'rgba(119, 137, 16, 1)',
      pointBackgroundColor: 'rgba(119, 137, 16, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(119, 137, 16, 1)'
    },
    { // blue
      backgroundColor: 'rgba(71, 148, 167, 0.8)',
      borderColor: 'rgba(71, 148, 167, 1)',
      pointBackgroundColor: 'rgba(71, 148, 167, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(71, 148, 167, 0.8)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.8)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  // events
  public chartClicked(e: any): void {
    // console.log(e);
  }

  public chartHovered(e: any): void {
    // console.log(e);
  }


}
