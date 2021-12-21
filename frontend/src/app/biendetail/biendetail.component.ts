import { BienServiceService } from './../services/bien-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-biendetail',
  templateUrl: './biendetail.component.html',
  styleUrls: ['./biendetail.component.css']
})
export class BiendetailComponent implements OnInit {

  bien: any;
  constructor(private route: ActivatedRoute, private bienservice: BienServiceService) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const bienId = Number(routeParams.get('bienId'));
    console.log(bienId);
    const type = routeParams.get('type');
    console.log(type);
    this.initBien(type,bienId);
  }

  initBien(type,bienId){
    this.bienservice.getBienById(type,bienId).subscribe(
      res => {
        this.bien = res;
        console.log(this.bien);
      }
    )
  }
}
