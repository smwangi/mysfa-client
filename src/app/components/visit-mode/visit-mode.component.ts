import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { VisitmodeService } from '../../services/visitmode.service';

@Component({
  selector: 'app-visit-mode',
  templateUrl: './visit-mode.component.html',
  styleUrls: ['./visit-mode.component.scss']
})
export class VisitModeComponent implements OnInit {

  visitmodes:{};
  
  constructor(private router:Router,private visitModeService:VisitmodeService) { }

  ngOnInit() {
    this.getVisitModes();
  }
  
  navVisitMode(){
    console.log('visit-mode clicked');
    this.router.navigate(['visit-mode'])
  }

  /**
   * Gets a list of visit modes from server
   */
  getVisitModes(): void{
    this.visitModeService.getVisitModes().subscribe(v => this.visitmodes = v);
  }
}
