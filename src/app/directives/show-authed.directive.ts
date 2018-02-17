import { Directive,TemplateRef,ViewContainerRef } from '@angular/core';
import { UserService } from '../services/user.service';
import { OnInit,Input } from '@angular/core';
import { take } from 'rxjs/operators/take';
import { Observable } from 'rxjs/Observable';

@Directive({
  selector: '[showAuthed]'
})
export class ShowAuthedDirective implements OnInit {

  constructor(
    private templateRef: TemplateRef<any>,
    private userService:UserService,
    private viewContainerRef:ViewContainerRef
  ) { }

  condition:boolean;

  ngOnInit(): void {
    this.userService.isUserLoggedIn.subscribe(
      (isAuthenticated) => {
        console.log(isAuthenticated);
        console.log(this.condition);
        if(isAuthenticated && this.condition || !isAuthenticated && !this.condition ){
          this.viewContainerRef.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainerRef.clear();
        }
      }
    );
  }

  @Input()
  set showAuthed(condition:boolean){
    this.condition = condition;
  }
}
