// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';


// Theme Routing
import {ActionsRoutingModule} from './actions-routing.module';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { EditDetailsComponent } from './edit-details/edit-details.component';
import { MyPatientsComponent } from './my-patients/my-patients.component';
import { PatientsMealsComponent } from './patients-meals/patients-meals.component';

@NgModule({
  imports: [
    CommonModule,
    ActionsRoutingModule
  ],
  declarations: [
    AddPatientComponent,
    EditDetailsComponent,
    MyPatientsComponent,
    PatientsMealsComponent
  ]
})
export class ActionsModule { }
