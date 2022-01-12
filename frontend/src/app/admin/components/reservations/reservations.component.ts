import { BienServiceService } from './../../../services/bien-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {

  reservations = [];
  reservationId = {};
  isPopup = false
  constructor(private bienservice: BienServiceService,) { }

  ngOnInit(): void {
    this.initReservations();
  }
  initReservations() {
    this.bienservice.getReservations().subscribe(
      res => {
        this.reservations = res["hydra:member"].slice(res['hydra:member'].length - 5, res['hydra:member'].length).reverse();;
        console.log(this.reservations);
      }
    )
  }

  ReservationById(id) {
    console.log(this.reservations[id]);
    this.isPopup = true;
    this.reservationId = this.reservations[id];
  }

  putReservation(id, value) {
    var val = {
      etat: value
    };
    
    this.bienservice.putReservation(id, val).subscribe(
      res => console.log(" Dialeu na")
    );

    this.isPopup= false;
    this.initReservations();
  }

}
