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
  urlsMaisons: any[] = [];
  urlsAppartements: any[] = [];
  urlsChambres: any[] = [];



  constructor(private servicebien: BienServiceService) { }

  ngOnInit(): void {
    this.initListBiens();
    this.initListMaisons();
    this.initListChambres();
    this.initListAppartements();
    // console.log(this.maisons);


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
        // console.log(res['hydra:member']);
        this.maisons = res['hydra:member'];
        this.maisons.forEach(
          (value) => {
            console.log(value.images[0]);
            this.servicebien.getImageById(value.images[0]).subscribe(
              res => {
                console.log(res);
                var reader = new FileReader();
                reader.readAsDataURL(res);
                reader.onload = (event) => {
                  this.urlsMaisons.push(event.target.result);
                }
              }
            )
          }
        );
        // console.log(this.urlsMaisons);
      }
    )
  }

  initListChambres() {
    this.servicebien.getChambres().subscribe(
      res => {
        // console.log(res['hydra:member']);
        
        this.chambres = res['hydra:member'];
        this.chambres.forEach(
          (value) => {
            console.log(value.images[0]);
            this.servicebien.getImageById(value.images[0]).subscribe(
              res => {
                console.log(res);
                var reader = new FileReader();
                reader.readAsDataURL(res);
                reader.onload = (event) => {
                  this.urlsChambres.push(event.target.result);
                }
              }
            )
          }
        );
        // console.log("Test CHa");
        // console.log(this.urlsChambres);
      }
    )
  }

  initListAppartements() {
    this.servicebien.getAppartements().subscribe(
      res => {
        // console.log(res['hydra:member']);
        this.appartements = res['hydra:member'];
        this.appartements.forEach(
          (value) => {
            console.log(value.images[0]);
            this.servicebien.getImageById(value.images[0]).subscribe(
              res => {
                var reader = new FileReader();
                reader.readAsDataURL(res);
                reader.onload = (event) => {
                  this.urlsAppartements.push(event.target.result);
                }
              }
            )
          }
        );
        // console.log("Test CHa");
        console.log(this.urlsChambres);
      }
    )
  }


}
