import {Component, OnInit} from '@angular/core';
import {User} from '../../shared/user.model';
import {UserService} from '../../shared/user.service';
import {NgForm} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
  user: User;
  default_picture = "https://bootdey.com/img/Content/user_1.jpg";
  grigalePic = "http://grigale.grigale.com/fitness360user_app/user_images/";

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.resetForm();
    localStorage.clear();
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
    }

    this.user = {
      Email: '',
      Password: '',
      PhoneNumber: '',
      FirstName: '',
      LastName: '',
      Birthday: '',
      Institution: '',
      Starting_year: '',

    };
  }

  OnSubmit(form: NgForm) {
    this.userService.loginUser(this.user.Email,this.user.Password)
      .subscribe((data: any) => {
          if (data.error == true){
            alert('Error!');
            this.router.navigateByUrl('/login');
          } else {
            this.user.FirstName = data.user.first_name;
            this.user.LastName = data.user.last_name;
            this.user.Birthday = data.user.birthdate;
            this.user.PhoneNumber = data.user.phone_number;
            localStorage.setItem('first_name', this.user.FirstName);
            localStorage.setItem('last_name', this.user.LastName);
            localStorage.setItem('birthday', this.user.Birthday);
            localStorage.setItem('phone_number', this.user.PhoneNumber);
            localStorage.setItem('email',this.user.Email);
            if (data.user.has_picture == true) {
              let user_pic = this.grigalePic.concat(localStorage.getItem('email'));
              user_pic = user_pic.concat('.jpg');
              localStorage.setItem('picture',user_pic);
            } else {
              localStorage.setItem('picture',this.default_picture);
            }
            this.router.navigateByUrl('/dashboard');
          }
        },
        err => {
          console.log('Error: ' + err.error);
        });
  }

  JumpToRegister() {
    this.router.navigateByUrl('/register');
  }

  JumpToForgotPassword() {
    this.router.navigateByUrl('/forgot_password');
  }

}

