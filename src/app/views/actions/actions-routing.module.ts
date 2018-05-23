import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddPatientComponent} from './add-patient/add-patient.component';
import {EditDetailsComponent} from './edit-details/edit-details.component';
import {MyPatientsComponent} from './my-patients/my-patients.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Actions'
    },
    children: [
      {
        path: 'add_patient',
        component: AddPatientComponent,
        data: {
          title: 'Add Patient'
        }
      },
      {
        path: 'my_patients',
        component: MyPatientsComponent,
        data: {
          title: 'my Patients'
        }
      },
      {
        path: 'edit_details',
        component: EditDetailsComponent,
        data: {
          title: 'Edit details'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActionsRoutingModule {}
