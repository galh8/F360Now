import { Component, OnInit } from '@angular/core';
import {CommonModule} from '@angular/common';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {


  users = [
    {
      id : 1,
      name : 'amir'
    },
    {
      id: 2,
      name: 'haim'
    }
  ];

  current_user = {id : 4 , name : 'tami'};

}
