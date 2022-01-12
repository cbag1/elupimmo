import { AuthServiceService } from './../../../services/auth-service.service';
import { BienServiceService } from './../../../services/bien-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  reservations: [];
  lastClients: [];
  nbBiens: number = 0;
  nbAgents: number = 0;



  constructor(private bienservice: BienServiceService, private authservice: AuthServiceService) { }

  ngOnInit(): void {
    this.initReservations();
    this.initUsersClient();
    this.initNombre();
  }

  initReservations() {
    this.bienservice.getReservations().subscribe(
      res => {
        this.reservations = res["hydra:member"].slice(res['hydra:member'].length - 5, res['hydra:member'].length).reverse();;
        console.log(this.reservations);
      }
    )
  }

  initUsersClient() {
    this.authservice.getClients().subscribe(
      res => {
        this.lastClients = res['hydra:member'].slice(res['hydra:member'].length - 3, res['hydra:member'].length).reverse();
        console.log(this.lastClients);

      }
    )
  }

  initNombre() {
    this.bienservice.getBiens().subscribe(
      res => {
        this.nbBiens = res['hydra:member'].length;
        console.log(this.nbBiens);
      }
    );
    this.authservice.getAgents().subscribe(
      res => {
        this.nbAgents = res['hydra:member'].length;
      }
    )
  }


}
