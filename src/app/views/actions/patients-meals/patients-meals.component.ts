import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../../shared/user.service';

@Component({
  selector: 'app-patients-meals',
  templateUrl: './patients-meals.component.html',
  styleUrls: ['./patients-meals.component.scss']
})
export class PatientsMealsComponent implements OnInit {
  showAlert = false;
  haveMeals = false;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {

  }

}
