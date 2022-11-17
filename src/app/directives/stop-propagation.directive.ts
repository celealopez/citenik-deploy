import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[clickStopPropagation]'
})
export class StopPropagationDirective {

  constructor() { }

  @HostListener('click', ['$event'])
  onClick(event: any){
    event.stopPropagation();
  }

}
