import { BienServiceService } from './../services/bien-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-biendetail',
  templateUrl: './biendetail.component.html',
  styleUrls: ['./biendetail.component.css']
})
export class BiendetailComponent implements OnInit {

  bien: any;
  urlsimages: any[] = [];
  lengthurl: number = 0;
  imageprincipale;
  constructor(private route: ActivatedRoute, private bienservice: BienServiceService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const bienId = Number(routeParams.get('bienId'));
    console.log(bienId);
    const type = routeParams.get('type');
    // console.log(type);
    this.initBien(type, bienId);
  }
  public getSantizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  initBien(type, bienId) {
    this.bienservice.getBienById(type, bienId).subscribe(
      res => {
        this.bien = res;
        console.log(this.bien);

        this.bien.images.forEach((value) => {
          this.lengthurl += 1;
          this.bienservice.getImageById(value).subscribe(
            res => {
              var reader = new FileReader();
              reader.readAsDataURL(res);
              reader.onload = (event) => {
                this.urlsimages.push(event.target.result);
                this.imageprincipale = this.urlsimages[0];

              }
            }
          )
        });
        // console.log(this.lengthurl);
        // console.log(this.imageprincipale);
        // this.lengthurl = this.urlsimages.length;

      }
    )
  }

  changerUrl(ev) {
    this.imageprincipale=ev;
    // console.log(ev);
  
  }

  reservation(){
    const routeParams = this.route.snapshot.paramMap;
    const bienId = '/api/biens/'+routeParams.get('bienId');
    const userId = '/api/clients/'+localStorage.getItem('id');
    this.bienservice.setReservation({'bien': bienId,'client':userId}).subscribe(
      res => console.log(res)
    );
    
    alert("Reservation Effetué avec Succés");
  }

}
