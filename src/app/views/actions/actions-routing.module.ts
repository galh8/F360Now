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
        path: 'pending_requests',
        component: AddPatientComponent,
        data: {
          title: 'Pending Requests'
        }
      },
      {
        path: 'my_patients',
        component: MyPatientsComponent,
        data: {
          title: 'My Patients'
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
