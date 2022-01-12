import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminComponent } from './components/admin/admin.component';
import { AddBienComponent } from './components/add-bien/add-bien.component';
import { UploadImageComponent } from './components/upload-image/upload-image.component';
import { ReservationsComponent } from './components/reservations/reservations.component';


@NgModule({
  declarations: [
    DashboardComponent,
    AdminComponent,
    AddBienComponent,
    UploadImageComponent,
    ReservationsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class AdminModule { }
