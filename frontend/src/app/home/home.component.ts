import { BienServiceService } from './../services/bien-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  maisons = [];
  biens = [];
  chambres = [];
  appartements = [];

  constructor(private servicebien: BienServiceService) { }

  ngOnInit(): void {
    this.initListBiens();
    this.initListMaisons();
    this.initListChambres();
    this.initListAppartements();


  }

  initListBiens() {
    this.servicebien.getBiens().subscribe(
      res => {
        console.log(res['hydra:member']);
        this.biens = res['hydra:member'];
      }

    );
  }

  initListMaisons() {
    this.servicebien.getMaisons().subscribe(
      res => {
        console.log(res['hydra:member']);
        this.maisons = res['hydra:member'];
      }
    )
  }

  initListChambres() {
    this.servicebien.getChambres().subscribe(
      res => {
        console.log(res['hydra:member']);
        this.chambres = res['hydra:member'];
      }
    )
  }

  initListAppartements() {
    this.servicebien.getAppartements().subscribe(
      res => {
        console.log(res['hydra:member']);
        this.appartements = res['hydra:member'];
      }
    )
  }


}
