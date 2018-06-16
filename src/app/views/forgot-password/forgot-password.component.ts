import { Component, OnInit } from '@angular/core';
import {User} from '../../shared/user.model';
import {UserService} from '../../shared/user.service';
import {NgForm} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './forgot-password.component.html'
})

export class ForgotPasswordComponent implements OnInit {
  user_email = '';
  showAlert = false;
  private timer;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
    }
  }

  OnRestore(user_email) {
    this.userService.restore_password(this.user_email)
      .subscribe((data: any) => {
          if (data.error == true) {
            alert('Error!');
          }
        },
        err => {
          console.log('Error: ' + err.error);
        });
    this.moveToLogin(this.router);
  }

  moveToLogin(router: Router) {
    this.showAlert = true;
    setTimeout(function () {
      router.navigateByUrl('/login');
    }, 3000);
  }

}
