import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(private router: Router) { }

  buttontoggled:boolean=false;

    OnClik(){
      this.buttontoggled=!this.buttontoggled;
    }

  ngOnInit() {
  }

  home(){
    this.router.navigate(['']);
  }
  navVisitMode(){
    console.log('visit-mode clicked');
    this.router.navigate(['visit-mode'])
  }
}
