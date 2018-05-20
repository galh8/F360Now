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

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.resetForm();
    localStorage.setItem('user1.first_name','amir');
    localStorage.setItem('user2.first_name','haim');
    localStorage.setItem('number_of_users','2');
    localStorage.setItem('current_patient','amir');
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
      Birthday: ''
    };
  }

  OnSubmit(form: NgForm) {
    //
    localStorage.setItem('user1.first_name','amir');
    localStorage.setItem('user2.first_name','haim');
    localStorage.setItem('number_of_users','2');

    console.log("ON sumbit function!!");
    console.log(this.user.Email);
    console.log(this.user.Password);

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
            console.log(data);
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

}

