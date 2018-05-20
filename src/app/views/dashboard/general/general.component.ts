import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {

  first_name = localStorage.getItem('first_name');
  last_name = localStorage.getItem('last_name');
  constructor() { }

  ngOnInit() {
  }

}
