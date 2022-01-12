import { BienServiceService } from './../../../services/bien-service.service';
import { AuthServiceService } from './../../../services/auth-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {

  reservations = [];
  reservationId = {};
  isPopup = false;

  constructor(private usersservices: AuthServiceService, private bienservice: BienServiceService) { }

  ngOnInit(): void {
    this.initReservations();
  }

  initReservations() {
    this.usersservices.getUsers().subscribe(
      res => {
        // console.log(res);
        let user = Object.values(res).find(
          ({ id }) => id === Number(localStorage.getItem('id'))
        );
        console.log(user);
        user.reservations.forEach((value) => {
          this.bienservice.getReservationById(value).subscribe(
            res => this.reservations.push(res)
          )

        });
      }
    )
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

  ReservationById(id) {
    console.log(this.reservations[id]);
    this.isPopup = true;
    this.reservationId = this.reservations[id];
  }

}
