import { BienServiceService } from './../../../services/bien-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-add-bien',
  templateUrl: './add-bien.component.html',
  styleUrls: ['./add-bien.component.css']
})
export class AddBienComponent implements OnInit {

  @ViewChild(AddBienComponent) bien;
  isShown: boolean = false;
  isMaison: boolean = false;
  filesUpload: File[];
  private categorie = "Maison";

  // FOrmulaire pour Bien
  bienForm: FormGroup;

  constructor(private bienservice: BienServiceService) { }

  ngOnInit(): void {
    this.initForm();
  }

  setImages(files: File[]) {
    this.filesUpload = files;
  }
  // Fonction d'initialisation du formulaire d'ajout de bien 
  initForm() {
    this.bienForm = new FormGroup({
      libelle: new FormControl('', { validators: [Validators.required] }),
      prix: new FormControl('', { validators: [Validators.required] }),
      surface: new FormControl('', { validators: [Validators.required] }),
      description: new FormControl('', { validators: [Validators.required] }),
      nbChambres: new FormControl('', { validators: [Validators.required] }),
      nbCuisines: new FormControl('', { validators: [Validators.required] }),
      nbEtages: new FormControl(1, { validators: [Validators.required] }),
      proprietaire: new FormControl('/api/proprietaires/' + localStorage.getItem('id'))
    })
  }

  servicebien(data) {
    if (this.categorie == "Maison") {
      return this.bienservice.setMaison(data);
    } else {
      if (this.categorie == "Appartement") {
        return this.bienservice.setAppartement(data);

      } else {
        return this.bienservice.setChambre(data);
      }
    }
  }
  // Fonction Process Ajout
  AddBienProcess() {
    console.log(this.bienForm.value);
    // console.log("Images")

    // console.log(this.filesUpload);
    var fonction = 'set' + this.categorie;
    this.servicebien(this.bienForm.value).subscribe(
      res => {
        this.filesUpload.forEach(
          (value) => {
            let formData = new FormData();
            let bien = '/api/' + this.categorie.toLowerCase() + 's/' + res['id'];
            formData.append('value', value);
            formData.append('bien', bien);
            this.bienservice.setImage(formData).subscribe(
              response => console.log(response)
            );
          }
        )

      }
    );


  }


  // }
  // Fonction qui gere le changement du select
  changevalue(ev) {
    // console.log(ev);
    this.categorie = ev;
    if (ev != "Chambre") {
      this.isShown = true;
      if (ev == "Maison") {
        this.isMaison = true;
      } else {
        this.isMaison = false;
      }
    } else {
      this.isShown = false;

    }
  }



}
