import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
//import * as $$ from 'jquery-ui';
import 'bootstrap-notify';

@Component({
  selector: 'app-visiteur',
  templateUrl: './visiteur.component.html',
  styleUrls: ['./visiteur.component.css']
})
export class VisiteurComponent implements OnInit {

  constructor() {

    $.notify({
      message: "Ce site permet de gérer une biblithèque en enrégistrant les auteurs des livres, les adhérents au bibliothèque, les catégories des livres, les livres; et permet également d'enrégistrer les emprunts des livres par les adhérents ; et toutes ces données sont stockées sur le serveur Heroku",
      
    },
    {
      animate: {
        enter: "animated bounceInRight",
        exit: "animated bounceOutRight"

      },
      timer: 10000,
      delay: 10000,
      type: "warning"
    });


   }

  ngOnInit(): void {

    var liste = [
      '<img id="banner2" src="../../assets/images/banner2.jpg" data-thumb="../assets/images/2.jpg" alt="" />',
      '<img id="banner3" src="../../assets/images/banner3.jpg" data-thumb="../assets/images/3.jpg" alt="" />',
      '<img id="banner1" src="../../assets/images/banner1.jpg" data-thumb="../assets/images/1.jpg" alt="" />'
    ];
    let i = 0;
    setInterval(() => {
    
      $("#slider").html(liste[i]);
      i++;
      if(i == 3){
        i = 0;
      }
    }, 2000)


  }

}
