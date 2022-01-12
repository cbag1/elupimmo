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

  setAppartement(data) {
    return this.http.post('http://localhost:8000/api/appartements', data);
  }

  setMaison(data) {
    return this.http.post('http://localhost:8000/api/maisons', data);
  }

  setImage(data: FormData) {
    return this.http.post('http://localhost:8000/api/images', data);

  }

  getImageById(id: string) {
    return this.http.get(`http://localhost:8000${id}`, { responseType: 'blob' });
  }

  getBienById(type:string, id:string) {
    var url=type.toLowerCase()+'s/'+id;
    return this.http.get(`http://localhost:8000/api/${url}`);
  }

  setReservation(data){
    return this.http.post('http://localhost:8000/api/reservations', data);

  }
  putReservation(id,data){
    return this.http.put(`http://localhost:8000/api/reservations/${id}`, data);

  }

  getReservationById(id: string){
    return this.http.get(`http://localhost:8000${id}`);

  }

  getMessageById(id: string){
    return this.http.get(`http://localhost:8000${id}`);

  }

  getReservations() {
    return this.http.get(`http://localhost:8000/api/reservations`);
  }


}

