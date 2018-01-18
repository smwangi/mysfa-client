import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-visit-mode',
  templateUrl: './visit-mode.component.html',
  styleUrls: ['./visit-mode.component.scss']
})
export class VisitModeComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  navVisitMode(){
    console.log('visit-mode clicked');
    this.router.navigate(['visit-mode'])
  }
}
