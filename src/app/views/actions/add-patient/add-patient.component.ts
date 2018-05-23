import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../shared/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss']
})

export class AddPatientComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }

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

  acceptFollowingRequset(patientEmail) {
    console.log('accept function');
    this.userService.accecptFollowingRequset(localStorage.getItem('email'), patientEmail)
      .subscribe((data: any) => {
          if (data.error == true) {
            alert('Error!');
          } else {
            console.log(data);
            // this.router.navigateByUrl('/actions/add_patient');
          }
        },
        err => {
          console.log('Error: ' + err.error);
        });
  }


}
