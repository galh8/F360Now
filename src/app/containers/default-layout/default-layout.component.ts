import {Component, Input, OnInit} from '@angular/core';
import { navItems } from './../../_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit{
  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement = document.body;
  userPicture: any;

  ngOnInit() {
    this.userPicture = localStorage.getItem('picture');
    console.log(this.userPicture);
  }

  constructor() {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = document.body.classList.contains('sidebar-minimized')
    });

    this.changes.observe(<Element>this.element, {
      attributes: true
    });
  }
}
