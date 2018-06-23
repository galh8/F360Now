import {Component, Input, OnInit} from '@angular/core';
import { navItems } from './../../_nav';
import {Router} from '@angular/router';
import {UserService} from '../../shared/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit{
  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement = document.body;
  public userPicture = "http://grigale.grigale.com/fitness360user_app/user_images/";
  numberOfMealsToUpdate = '';

  constructor(private router: Router,private userService: UserService) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = document.body.classList.contains('sidebar-minimized')
    });

    this.changes.observe(<Element>this.element, {
      attributes: true
    });
  }

  ngOnInit() {
    this.userPicture = localStorage.getItem('picture');
    this.userService.get_pending_meals_images(localStorage.getItem('email'))
      .subscribe((data: any) => {
          if (data.error == true) {
            alert('Error!');
          } else {
            if (data.length > 0) {
              this.numberOfMealsToUpdate = data.length;
            }
          }
        },
        err => {
          console.log('Error: ' + err.error);
        });
  }

  JumpToForgotPatientMeals() {
    this.router.navigateByUrl('actions/patients_meals_images');
  }

}
