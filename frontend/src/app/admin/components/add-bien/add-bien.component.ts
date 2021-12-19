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
  filesUpload: File[];

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
      proprietaire: new FormControl('/api/proprietaires/' + localStorage.getItem('id'))
    })
  }

  // Fonction Process Ajout
  AddBienProcess() {
    console.log(this.bienForm.value);
    // console.log("Images")
    this.bienservice.setChambre(this.bienForm.value).subscribe(
      res => console.log(res)
    )
    // console.log(this.filesUpload);
  }
  // Fonction qui gere le changement du select
  changevalue(ev) {
    // console.log(ev);
    if (ev != "C") {
      this.isShown = true;
    } else {
      this.isShown = false;
    }
  }



}
