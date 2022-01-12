import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient) { }

  // Service Login
  login(data) {
    return this.http.post(`http://localhost:8000/api/login`, data)
      .pipe(
        map(response => {
          // login successful if there's a jwt token in the response
          if (response) {
            localStorage.setItem('jwt', JSON.stringify(response));
            return response;
          }
        })
      );
  }

  signupClient(data) {
    return this.http.post(`http://localhost:8000/api/clients`, data);
  }

  getClients() {
    return this.http.get(`http://localhost:8000/api/clients`);
  }

  getAgents() {
    return this.http.get(`http://localhost:8000/api/proprietaires`);
  }

  getUsers() {
    return this.http.get(`http://localhost:8000/api/admin/users`);
  }


}
