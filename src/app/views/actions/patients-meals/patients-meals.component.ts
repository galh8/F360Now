import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../../shared/user.service';
import { TSMap } from 'typescript-map';
import { Location } from '@angular/common';

@Component({
  selector: 'app-patients-meals',
  templateUrl: './patients-meals.component.html',
  styleUrls: ['./patients-meals.component.scss']
})
export class PatientsMealsComponent implements OnInit {
  showAlert = false;
  haveMeals = false;
  meals: any;
  current_patient_meals = [];
  map_of_patients = new TSMap<string, string[]>();
  list_of_patient = [];
  current_patient_email = '';
  root_url = 'http://grigale.grigale.com/fitness360user_app/user_images/meal_images_new/';
  current_calories = '';

  constructor(private router: Router, private userService: UserService, private location: Location) { }

  ngOnInit() {
    this.userService.get_pending_meals_images(localStorage.getItem('email'))
      .subscribe((data: any) => {
          if (data.error == true) {
            alert('Error!');
          } else {
            if (data.length > 0) {
              this.meals = data;
              this.haveMeals = true;
              this.set_good_url_for_pictures();
              for (let i = 0; i < this.meals.length; i++) {
                this.map_of_patients.set(this.meals[i].patient_email, [this.meals[i].first_name, this.meals[i].last_name]);
              }
              this.map_of_patients.forEach((value: string[], key: string) => {
                this.list_of_patient.push([key,value[0],value[1]]);
              });
              this.get_all_pending_meals_of_patient(this.list_of_patient[0][0]);
              console.log(this.meals);
           }
          }
        },
        err => {
          console.log('Error: ' + err.error);
        });
  }

  public get_all_pending_meals_of_patient(patient_email) {
    this.current_patient_meals = [];
    this.current_patient_email = patient_email;
    for (let i = 0; i < this.meals.length; i++) {
      if (patient_email == this.meals[i].patient_email) {
        this.current_patient_meals.push(this.meals[i]);
      }
    }
  }

  public set_good_url_for_pictures() {
    for (let i = 0; i < this.meals.length; i++) {
      let email = this.meals[i].patient_email;
      let pic = this.meals[i].image_file_name;
      this.meals[i].full_path = this.root_url + email + '/' + pic;
    }
  }

  public send_calories_for_pic(calories, patient_email, image_file_name) {
    console.log(calories);
    console.log(patient_email);
    console.log(image_file_name);
    this.userService.update_patient_meal(calories, patient_email, image_file_name)
      .subscribe((data: any) => {
          if (data.error == true) {
            alert('Error!');
          } else {
            location.reload();
          }
        },
        err => {
          console.log('Error: ' + err.error);
        });
  }

}
