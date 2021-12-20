import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BienServiceService {

  constructor(private http: HttpClient) { }


  // Recuperation de tous les biens
  getBiens() {
    return this.http.get(`http://localhost:8000/api/biens`);
  }

  getMaisons() {
    return this.http.get(`http://localhost:8000/api/maisons`);
  }

  getChambres() {
    return this.http.get(`http://localhost:8000/api/chambres`);
  }

  getAppartements() {
    return this.http.get(`http://localhost:8000/api/appartements`);
  }
  setChambre(data) {
    return this.http.post('http://localhost:8000/api/chambres', data);
  }
  setImage(data : FormData){
    return this.http.post('http://localhost:8000/api/images', data);

  }

}

