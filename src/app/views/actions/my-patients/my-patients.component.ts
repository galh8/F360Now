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
  defulat_picture: string;
  default_picture = "https://bootdey.com/img/Content/user_1.jpg";
  grigalePic = "http://grigale.grigale.com/fitness360user_app/user_images/";



  ngOnInit() {
    this.userService.getAllPatients(localStorage.getItem('email'))
      .subscribe((data: any) => {
          if (data.error == true) {
            alert('Error!');
          } else {
            console.log(data);
            console.log(data[0].first_name);
            this.patients = data;
            for (let i = 0; i < data.length; i++) {
              if (data[i].has_picture == 1) {
                data[i].picture_path = this.grigalePic.concat(data[i].patient_email);
                data[i].picture_path = data[i].picture_path.concat('.jpg');
                console.log(data[i]);
              }
            }
          }
        },
        err => {
          console.log('Error: ' + err.error);
        });
  }

}
