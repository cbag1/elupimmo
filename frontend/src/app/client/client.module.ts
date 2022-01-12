import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ReservationsComponent } from './components/reservations/reservations.component';
import { MessagesComponent } from './components/messages/messages.component';
import { ClientComponent } from './components/client/client.component';


@NgModule({
  declarations: [
    ReservationsComponent,
    MessagesComponent,
    ClientComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule
  ]
})
export class ClientModule { }
