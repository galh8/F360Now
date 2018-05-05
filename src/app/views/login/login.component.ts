import {Component, OnInit} from '@angular/core';
import {User} from '../../shared/user.model';
import {UserService} from '../../shared/user.service';
import {NgForm} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {Data, Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
  user: User;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.resetForm();
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

    console.log("ON sumbit function!!");
    console.log(this.user.Email);
    console.log(this.user.Password);
    var u: Data;

    this.userService.loginUser(this.user.Email,this.user.Password)
      .subscribe((data: any) => {
          if (data.error == true){
            alert('Error!');
            this.router.navigateByUrl('/login');
          } else {
            //alert('Succeeded! - welcom' + data.u.first_name);
            console.log(data);
            u = data.object;
            console.log(u);
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

