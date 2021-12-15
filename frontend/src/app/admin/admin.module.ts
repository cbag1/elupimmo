import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminComponent } from './components/admin/admin.component';
import { AddBienComponent } from './components/add-bien/add-bien.component';


@NgModule({
  declarations: [
    DashboardComponent,
    AdminComponent,
    AddBienComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class AdminModule { }
