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
  default_picture = "https://bootdey.com/img/Content/user_1.jpg";
  grigalePic = "http://grigale.grigale.com/fitness360user_app/user_images/";
  havePatients = false;
  showAlert = false;


  ngOnInit() {
    this.userService.getAllPatients(localStorage.getItem('email'))
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
              this.havePatients = true;
            } else {
              this.showAlert = true;
            }
          }
        },
        err => {
          console.log('Error: ' + err.error);
        });
  }

  deletePatient(patientEmail) {

    this.userService.deletePatient(localStorage.getItem('email'), patientEmail)
      .subscribe((data: any) => {
          if (data.error == true) {
            alert('Error!');
          } else {
            // this.router.navigateByUrl('/actions/add_patient');
          }
        },
        err => {
          console.log('Error: ' + err.error);
        });
  }

}
