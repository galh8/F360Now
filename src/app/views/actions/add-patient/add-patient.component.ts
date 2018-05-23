import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../shared/user.service';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss']
})

export class AddPatientComponent implements OnInit {

  constructor(private userService: UserService) { }

  patients : any;

  ngOnInit() {
    this.userService.getNewPatients(localStorage.getItem('email'))
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
