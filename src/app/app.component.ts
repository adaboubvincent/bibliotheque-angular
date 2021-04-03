import { Component, OnInit } from '@angular/core';
import { fromEvent, merge, of } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import * as $ from 'jquery';
import 'bootstrap-notify';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'bibliotheque';
  online: Observable<boolean>;

  constructor() {
    this.online = merge(
      of(navigator.onLine),
      fromEvent(window, 'online').pipe(mapTo(true)),
      fromEvent(window, 'offline').pipe(mapTo(false))
    );
    
  }

  ngOnInit() {
    this.online = merge(
      of(navigator.onLine),
      fromEvent(window, 'online').pipe(mapTo(true)),
      fromEvent(window, 'offline').pipe(mapTo(false))
    );
    this.online.subscribe((etat) => {
      if(etat === false){
        this.notificationAjouter("Veuilez vous connecter à l'internet pour avoir accès à l'API", "warning");
      }
    });
  }

  notificationAjouter(message: string, type: string ="success"){
    $.notify({
      message: message,
      
    },
    {
      animate: {
        enter: "animated bounceInRight",
        exit: "animated bounceOutRight"

      },
      timer: 10000,
      delay: 10000,
      type: type
    });
}
    

}
