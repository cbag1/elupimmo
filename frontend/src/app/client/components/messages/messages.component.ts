import { BienServiceService } from './../../../services/bien-service.service';
import { AuthServiceService } from './../../../services/auth-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  messages = [];
  isprofil: boolean = true;

  constructor(private usersservices: AuthServiceService, private bienservice: BienServiceService) { }

  ngOnInit(): void {
    this.initMessages();
  }

  initMessages() {
    console.log(localStorage.getItem('id'));
    this.usersservices.getUsers().subscribe(
      res => {
        // console.log(res);
        let user = Object.values(res).find(
          ({ id }) => id === Number(localStorage.getItem('id'))
        );
        console.log(user);
        user.messages.forEach(element => {

          // console.log(element);
          console.log(localStorage.getItem('id'));
          this.bienservice.getMessageById(element).subscribe(
            res => {
              console.log(res);
              this.messages.push(res);
              let last = res['client']['id'];
              if (last !== Number(localStorage.getItem('id'))) {
                this.isprofil = false;
              }
            }
          )

        });
        // console.log(res.find(({ id }) => id === Number(localStorage.getItem('id'))))
      }
    )
  }

}
