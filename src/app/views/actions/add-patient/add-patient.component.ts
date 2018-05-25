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
  default_picture = "https://bootdey.com/img/Content/user_1.jpg";
  grigalePic = "http://grigale.grigale.com/fitness360user_app/user_images/";
  haveRequests = false;
  showAlert = false;

  ngOnInit() {
    this.userService.getNewPatients(localStorage.getItem('email'))
      .subscribe((data: any) => {
          if (data.error == true) {
            alert('Error!');
          } else {
            this.patients = data;
            if (this.patients.length > 0) {
              for (let i = 0; i < data.length; i++) {
                if (data[i].has_picture == 1) {
                  data[i].picture_path = this.grigalePic.concat(data[i].patient_email);
                  data[i].picture_path = data[i].picture_path.concat('.jpg');
                }
              }
              this.haveRequests = true;
            } else {
              console.log('im heere!')
              this.showAlert = true;
            }
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

  deleteRequest(patientEmail) {

    this.userService.deleteFollowingRequset(localStorage.getItem('email'), patientEmail)
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
