import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import {CommonModule} from '@angular/common';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './user/user.component';
import { GeneralComponent } from './general/general.component';


@NgModule({
  imports: [
    FormsModule,
    DashboardRoutingModule,
    ChartsModule,
    BsDropdownModule,
    CommonModule,
    ButtonsModule.forRoot()
  ],
  declarations: [ DashboardComponent, UsersComponent, UserComponent, GeneralComponent ]
})
export class DashboardModule { }
