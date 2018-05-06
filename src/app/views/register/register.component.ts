import {Component, OnInit} from '@angular/core';
import {UserService} from '../../shared/user.service';
import {NgForm} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {Data, Router} from '@angular/router';
import {User} from '../../shared/user.model'

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit {
  user: User;
  private RePass;

  constructor(private router: Router, private userService: UserService) { }

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

    this.userService.registerUser(form.value)
      .subscribe((data: any) => {
          console.log(data.error);
          if (data.error == true){
            alert('Error!');
          } else {
            this.router.navigateByUrl('/login');
          }
        },
        err => {
          console.log('Error: ' + err.error);
        });
  }

}
