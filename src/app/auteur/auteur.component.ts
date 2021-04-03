import { Component, OnInit } from '@angular/core';
import { Auteur } from 'src/models/Auteur';
import { AuteurService } from '../services/auteur/auteur.service';
import { FormBuilder, Validators } from '@angular/forms';
import * as $ from 'jquery';
//import * as $$ from 'jquery-ui';
import 'bootstrap-notify';
import { LivreService } from '../services/livre/livre.service';
import { Livre } from 'src/models/Livre';

@Component({
  selector: 'app-auteur',
  templateUrl: './auteur.component.html',
  styleUrls: ['./auteur.component.css']
})
export class AuteurComponent implements OnInit {
  afficheMessageAlert = false;
  message = "";
  auteurAModifier: any;
  nomAModifier: string = "";
  prenomAModifier: string = "";

  nomAAfficher: string | undefined = "";
  prenomAAfficher: string | undefined = "";

  submitted: boolean = false;
  viewAjoutAuteur: boolean = true;
  estEnModeEdit = false;
  preView: boolean = true;
  auteurs: Auteur[] = [];
  idAuteur: number = -1;

  livres: Livre[] = [];
  numberOfLivreWrite: number = 0;

  numberToSeeListAuteur: number = 0;

  nom = this.fb.control('', Validators.required);
  prenom = this.fb.control('', Validators.required);
  auteur: Auteur = new Auteur();

  constructor(private auteurService: AuteurService, private fb: FormBuilder, private livreService: LivreService) { 
    
  }
    
  ngOnInit(): void {
   /*  this.auteurService.objectSubject.subscribe((auts: Auteur[]) => {
      this.auteurs = auts;
    });
    this.auteurService.emitObjectSubject();


    this.livreService.objectSubject.subscribe((livs: Livre[]) => {
      this.livres = livs;
    });
    this.livreService.emitObjectSubject(); */

    this.auteurService.getAll("auteurs/").subscribe((auts: Auteur[]) => {
      this.auteurs = auts;
    });
    this.auteurService.emitObjectSubject();


    this.livreService.getAll("livres/").subscribe((livs: Livre[]) => {
      this.livres = livs;
    });
    this.livreService.emitObjectSubject();


  }

  onSubmit(){
    this.submitted = true;
  }

  addAuteur(){
    this.preView = false;
    this.affecterData();
    /* this.auteurService.ajouter(this.auteur);
    this.auteurService.emitObjectSubject(); */
    this.auteurService.addT("ajout-auteur/",this.auteur).subscribe(res => {
      console.log(res);
      this.ngOnInit();
    });
    this.auteurService.emitObjectSubject();
    this.messageAlert("L'auteur "+this.auteur.nom+" "+this.auteur.prenom+" est bien ajouté");
    this.auteur = new Auteur();
    this.resetData();
    
  }
  
  showPageAjout(){
    this.viewAjoutAuteur = true;
  }
  pristinePageAjout(){
    this.viewAjoutAuteur = false;
    if(this.auteurs.length !== 0 && this.numberToSeeListAuteur === 0){
      this.notificationAjouter("Vous pouvez cliquer sur les photos de profile des auteur pour voir leur profile");
      this.numberToSeeListAuteur++;
    }
    this.auteur = new Auteur();
    this.resetData();
    this.estEnModeEdit = false;
  }

  deleteAuteur(id: number | undefined = 0){
    if(confirm("Vous êtes sûr de pouvoir supprimer cet auteur ?\nUne fois supprimée cet auteur tous ses livres ainsi que les historique d'emprunt sur ces livres séront indisponibles dans cette bibliothèque.")){
      /* this.auteurService.supprimer(id);
      this.auteurService.emitObjectSubject(); */
      this.auteurService.deletT("auteur/"+id+"/", this.auteurs.find((item) => {
        return item.id === id
      })).subscribe(res =>{
        let etat = res;
        this.ngOnInit();
      });
      this.auteurService.emitObjectSubject(); 
      this.messageAlert("Un auteur a été supprimé");
    }
    
  }

  editAuteur(id: number){
    this.affecterData();
    /* this.auteurService.modifier(id, this.auteur); */
    this.auteurService.modifyT("auteur/"+this.auteurs.find((item, index) => {
      return index === id
    })?.id+"/", this.auteur).subscribe(res => {
      let i = res;
      this.ngOnInit();
    });
    this.auteurService.emitObjectSubject();
    this.messageAlert("L'auteur "+this.nomAModifier+" "+this.prenomAModifier+" vient d'être modifié en "+this.auteur.nom+" "+this.auteur.prenom);
    
    this.auteurAModifier = null;
    this.nomAModifier ="";
    this.prenomAModifier = "";
    this.auteur = new Auteur();

    this.resetData();
    this.estEnModeEdit = false;
    this.viewAjoutAuteur = false;
    this.idAuteur = -1;
  }

  estVideAuteursListeAndPreView(){
    if(this.auteurs.length === 0 && this.preView){
      return true;
    }
    return false;
  }
  showEditPage(id: number){
    this.estEnModeEdit = true;
    this.showPageAjout();

    this.auteur = this.findElement(id);
    this.auteurAModifier = this.findElementAModifier(id);
    this.nomAModifier = this.auteurAModifier.nom;
    this.prenomAModifier = this.auteurAModifier.prenom;

    this.nom.setValue(this.auteur.nom);
    this.prenom.setValue(this.auteur.prenom);

    this.idAuteur = id;
  }
  findElement(id: number): Auteur{
    return this.auteurs[id];
  }

  findElementAModifier(id: number): Auteur{
    return this.auteurs[id];
  }

  affecterData(){
    this.auteur.nom = this.nom.value;
    this.auteur.prenom = this.prenom.value;
  }

  resetData(){
    this.nom.setValue('');
    this.prenom.setValue('');
  }

  messageAlert(message: string){
    this.afficheMessageAlert = true;
    this.message = message;
    setTimeout(() => {
      this.afficheMessageAlert = false;
      this.message = "";
    }, 3000);
  }

  noAction(id: number){
    $('.no-action').click((event) => event.preventDefault());
    this.numberOfLivreWrite = this.livres.filter((item) =>{
      return item.auteur?.id === this.findElement(id).id;
    }).length;
    this.nomAAfficher = this.findElement(id).nom;
    this.prenomAAfficher = this.findElement(id).prenom;
  }


/* 
  dialogue(element: string, title: string, modal: boolean = true) {
    $(element).dialog({
        show : 'slideDown',
        title : title,
        width : 1000,
        minWidth : 200,
        minHeight : 300,
        modal : modal,
        hide : 1000,

        buttons : {
            "cancel" : function(event: any) {
                event.preventDefault();
                $(element).dialog('close');
            }
        }
    });
  }

  b(){
    $('#dialogue-aide-documentation').hide();
    setTimeout(() => {
        this.dialogue('#dialogue-aide-documentation', "Aide Documentation", false);
    }, 1000);
  }

 */
  notificationAjouter(message: string, type: string ="success"){
    //$[`notify`](....);
    /* notify({
        text: message,
        type: type, layout: "topRight", timeout: 4000, 
        animation: {
            open: 'animated bounceInRight',
            close: 'animated bounceOutRight',
            easing: 'swing',
            speed: 500
        }
    }); */
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
   /*  $[`notify`]({
        message: 'Hello World'
      },
      {
        type: type
      }
    ); */
}

}
