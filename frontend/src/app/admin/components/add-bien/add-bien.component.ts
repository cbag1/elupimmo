import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-add-bien',
  templateUrl: './add-bien.component.html',
  styleUrls: ['./add-bien.component.css']
})
export class AddBienComponent implements OnInit {

  @ViewChild(AddBienComponent) bien;

  constructor() { }

  ngOnInit(): void {
  }

}
