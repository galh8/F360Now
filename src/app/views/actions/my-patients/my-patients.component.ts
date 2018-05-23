import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../shared/user.service';

@Component({
  selector: 'app-my-patients',
  templateUrl: './my-patients.component.html',
  styleUrls: ['./my-patients.component.scss']
})
export class MyPatientsComponent implements OnInit {

  constructor(private userService: UserService) { }

  patients : any;

  ngOnInit() {
    this.userService.getAllPatients(localStorage.getItem('email'))
      .subscribe((data: any) => {
          if (data.error == true) {
            alert('Error!');
          } else {
            console.log(data);
            console.log(data[0].first_name);
            this.patients = data;
          }
        },
        err => {
          console.log('Error: ' + err.error);
        });
  }

}
