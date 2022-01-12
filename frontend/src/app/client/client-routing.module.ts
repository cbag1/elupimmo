import { ClientComponent } from './components/client/client.component';
import { MessagesComponent } from './components/messages/messages.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservationsComponent } from './components/reservations/reservations.component';

const routes: Routes = [
  {
    path: 'client', component: ClientComponent,
    children: [
      { path: 'reservations', component: ReservationsComponent },
      { path: 'messages', component: MessagesComponent }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
