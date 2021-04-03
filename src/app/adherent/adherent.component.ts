import { Component, OnInit } from '@angular/core';
import { Adherent } from 'src/models/Adherent';
import { AdherentService } from '../services/adherent/adherent.service';
import { FormBuilder, Validators } from '@angular/forms';
import * as $ from 'jquery';
import 'jquery-ui';
import { Bibliotheque } from '../../models/Bibliotheque';
import { BibliothequeService } from '../services/bibliotheque/bibliotheque.service';

@Component({
  selector: 'app-adherent',
  templateUrl: './adherent.component.html',
  styleUrls: ['./adherent.component.css']
})
export class AdherentComponent implements OnInit {

  afficheMessageAlert = false;
  message = "";
  adherentAModifier: any;
  nomAModifier: string ="";
  prenomAModifier: string = "";

  submitted: boolean = false;
  viewAjoutAdherent: boolean = true;
  estEnModeEdit = false;
  preView: boolean = true;
  adherents: Adherent[] = [];
  idAdherent: number = -1;

  nomAAfficher: string | undefined = "";
  prenomAAfficher: string | undefined = "";
  numberOfLivreEmprunt: number = 0;
  bibliotheques: Bibliotheque[] = [];
  numberToSeeListAdherent: number = 0;

  nom = this.fb.control('', Validators.required);
  prenom = this.fb.control('', Validators.required);
  telephone = this.fb.control('', Validators.required);
  email = this.fb.control('', [Validators.required, Validators.email]);
  adherent: Adherent = new Adherent();

  constructor(private adherentService: AdherentService, private fb: FormBuilder, private bibliothequeService: BibliothequeService) { 
  }
    
  ngOnInit(): void {
/*     this.adherentService.objectSubject.subscribe((adhs: Adherent[]) => {
      this.adherents = adhs;
    });
    this.adherentService.emitObjectSubject();

    this.bibliothequeService.objectSubject.subscribe((bis: Bibliotheque[]) => {
      this.bibliotheques = bis;
    });
    this.bibliothequeService.emitObjectSubject(); */

    this.adherentService.getAll("adherents/").subscribe((adhs: Adherent[]) => {
      this.adherents = adhs;
    });
    this.adherentService.emitObjectSubject();

    this.bibliothequeService.getAll("bibliotheques/").subscribe((bis: Bibliotheque[]) => {
      this.bibliotheques = bis;
    });
    this.bibliothequeService.emitObjectSubject();


  }

  onSubmit(){
    this.submitted = true;
  }

  addAdherent(){
    this.preView = false;
    this.affecterData();
    this.adherentService.addT("ajout-adherent/",this.adherent).subscribe(res => {
      console.log(res);
      this.messageAlert("L'Adhérent "+this.adherent.nom+" "+this.adherent.prenom+" est bien ajouté");
      this.ngOnInit();
    });
    /* this.adherentService.ajouter(this.adherent); */
    this.adherentService.emitObjectSubject();
    
    this.adherent = new Adherent();
    this.resetData();
    
  }



  showPageAjout(){
    this.viewAjoutAdherent = true;
  }
  pristinePageAjout(){
    this.viewAjoutAdherent = false;

    if(this.bibliotheques.length !== 0 && this.numberToSeeListAdherent === 0){
      this.notificationAjouter("Vous pouvez cliquer sur les photos de profile des adhérents pour voir leur profile");
      this.numberToSeeListAdherent++;
    }

    this.adherent = new Adherent();
    this.resetData();
    this.estEnModeEdit = false;
  }

  deleteAdherent(id: number | undefined = 0){
    if(confirm("Vous êtes sûr de pouvoir supprimer cet adhérent ?\nUne fois supprimée cet adhérent tous ses livres emprunts enrégistés séront supprimés également dans cette bibliothèque.")){
      /* this.adherentService.supprimer(id);
      this.adherentService.emitObjectSubject(); */
      this.adherentService.deletT("adherent/"+id+"/", this.adherents.find((item) => {
        return item.id === id
      })).subscribe(res =>{
        let etat = res;
        this.messageAlert("Un adhérent a été supprimé");
        this.ngOnInit();
      });
      this.adherentService.emitObjectSubject();
    }
  }

  editAdherent(id: number){
    this.affecterData();
    /* this.adherentService.modifier(id, this.adherent);
    this.adherentService.emitObjectSubject(); */

    this.adherentService.modifyT("adherent/"+this.adherents.find((item, index) => {
      return index === id
    })?.id+"/", this.adherent).subscribe(res => {
      let i = res;
      this.ngOnInit();
    });
    this.adherentService.emitObjectSubject();
    this.messageAlert("L'auteur "+this.nomAModifier+" "+this.prenomAModifier+" vient d'être modifié en "+this.adherent.nom+" "+this.adherent.prenom);
    
    this.adherentAModifier = null;
    this.nomAModifier ="";
    this.prenomAModifier = "";

    this.adherent = new Adherent();
    this.resetData();
    this.estEnModeEdit = false;
    this.viewAjoutAdherent = false;
    this.idAdherent = -1;
  }

  estVideAuteursListeAndPreView(){
    if(this.adherents.length === 0 && this.preView){
      return true;
    }
    return false;
  }
  showEditPage(id: number){
    this.estEnModeEdit = true;
    this.showPageAjout();

    this.adherent = this.findElement(id);
    this.adherentAModifier = this.findElement(id);

    this.nomAModifier = this.adherentAModifier.nom;
    this.prenomAModifier = this.adherentAModifier.prenom;

    this.nom.setValue(this.adherent.nom);
    this.prenom.setValue(this.adherent.prenom);
    this.telephone.setValue(this.adherent.telephone);
    this.email.setValue(this.adherent.email);

    this.idAdherent = id;
  }
  findElement(id: number): Adherent{
    return this.adherents[id];
  }

  affecterData(){
    this.adherent.nom = this.nom.value;
    this.adherent.prenom = this.prenom.value;
    this.adherent.telephone = this.telephone.value;
    this.adherent.email = this.email.value;
  }

  resetData(){
    this.nom.setValue('');
    this.prenom.setValue('');
    this.telephone.setValue('');
    this.email.setValue('');
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
    this.numberOfLivreEmprunt = this.bibliotheques.filter((item) =>{
      return item.adherent?.id === this.findElement(id).id;
    }).length;
    console.log(this.numberOfLivreEmprunt);
    this.nomAAfficher = this.findElement(id).nom;
    this.prenomAAfficher = this.findElement(id).prenom;
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
