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

  users = [
    {
      id : 1,
      First_name : 'Amir',
      Last_name : 'Halfon',
      Weight : 60,
      Height : 180,
      Fat : 12,
      Mass : 60,
      last_weight : [100, 50, 60, 40],
      last_fat : [81, 60, 80, 100],
      last_muscal : [90, 60, 80, 40]
    },
    {
      id : 2,
      First_name : 'Haim',
      Last_name : 'Tzadok',
      Weight : 70,
      Height : 170,
      Fat : 16,
      Mass : 80,
      last_weight : [81, 56, 55, 40],
      last_fat : [81, 56, 55, 40],
      last_muscal : [81, 56, 55, 40]
    }
  ];

  current_user = this.users[0];

  patients:any;

  constructor(private userService: UserService) {}

  ngOnInit() {

    this.userService.getInfo(localStorage.getItem('email'))
      .subscribe((data: any) => {
          if (data.error == true){
            console.log('error');
          } else {
            console.log(data);
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
            console.log(data);
            this.patients = data;

            // Get first patient activity
            this.userService.getPatientActivity(this.patients[0].patient_email)
              .subscribe((data: any) => {
                  if (data.error == true) {
                    alert('Error!');
                  } else {
                    console.log(data);
                  }
                },
                err => {
                  console.log('Error: ' + err.error);
                });

            // Get first patient scale
            this.userService.getPatientScales(this.patients[0].patient_email)
              .subscribe((data: any) => {
                  if (data.error == true) {
                    alert('Error!');
                  } else {
                    console.log(data);
                  }
                },
                err => {
                  console.log('Error: ' + err.error);
                });
          }
        },
        err => {
          console.log('Error: ' + err.error);
        });

  }

  public onSelect(user) {
    this.current_user = user.last_name;
  }

  //TODO import measurements!
  // lineChart
  public lineChartData: Array<any> = [
    {data: this.current_user.last_weight, label: 'Weight'},
    {data: this.current_user.last_fat, label: 'Body Fat'},
    {data: this.current_user.last_muscal, label: 'Muscal Mass'}
  ];

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

  public barChartData: any[] = [
    {data: [10000, 9000, 10000, 11000], label: 'Total Calories'},
    {data: [2500  , 3000, 5000, 6000], label: 'Activity Calories'}
  ];

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}
