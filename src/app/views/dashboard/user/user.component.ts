import { Component, OnInit } from '@angular/core';
import {current} from 'codelyzer/util/syntaxKind';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  inputs : ['current_user']
})
export class UserComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
