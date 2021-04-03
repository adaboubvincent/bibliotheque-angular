import { Component, OnInit } from '@angular/core';
import { Livre } from 'src/models/Livre';
import { Adherent } from '../../models/Adherent';
import { Bibliotheque } from '../../models/Bibliotheque';
import { FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import * as $ from 'jquery';
import 'jquery-ui';
import { Categorie } from 'src/models/Categorie';
import { Auteur } from 'src/models/Auteur';
import { LivreService } from '../services/livre/livre.service';
import { AdherentService } from '../services/adherent/adherent.service';
import { BibliothequeService } from '../services/bibliotheque/bibliotheque.service';

@Component({
  selector: 'app-bibliotheque',
  templateUrl: './bibliotheque.component.html',
  styleUrls: ['./bibliotheque.component.css']
})
export class BibliothequeComponent implements OnInit {

  afficheMessageAlert = false;
  message = "";
  bibliothequeAModifier: any;
  nomAModifier: string = "";
  prenomAModifier: string = "";
  livreAModidifer: string = "";


  submitted: boolean = false;
  viewAjoutBibliotheque: boolean = true;
  estEnModeEdit = false;
  preView: boolean = true;

  idBibliotheque: number = -1;

  livres: Livre[] = [];
  adherents: Adherent[] = [];
  bibliotheques: Bibliotheque[] = [];

  datePris = this.fb.control((moment(new Date)).format('DD-MM-YYYY'), Validators.required);
  adherent = this.fb.control(new Adherent(), Validators.required, );
  livre = this.fb.control(new Livre(), Validators.required);
  dateRetour = this.fb.control(new Date(), Validators.required);
  bibliotheque: Bibliotheque = new Bibliotheque();

  constructor(private livreService: LivreService, private fb: FormBuilder, 
    private adherentService: AdherentService, private bibliothequeService: BibliothequeService) { }

  ngOnInit(): void {
    /* this.livreService.objectSubject.subscribe((livs: Livre[]) => {
      this.livres = livs;
    });
    this.livreService.emitObjectSubject();
    this.adherentService.objectSubject.subscribe((adhs: Adherent[]) => {
      this.adherents = adhs;
    });
    this.adherentService.emitObjectSubject();
    this.bibliothequeService.objectSubject.subscribe((bis: Bibliotheque[]) => {
      this.bibliotheques = bis;
    });
    this.bibliothequeService.emitObjectSubject(); */
    this.livreService.getAll("livres/").subscribe((livs: Livre[]) => {
      this.livres = livs;
    });
    this.livreService.emitObjectSubject();
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

  addBibliotheque(){
    this.preView = false;
    this.affecterData();
    /* this.bibliothequeService.ajouter(this.bibliotheque); */
    this.bibliothequeService.addT("ajout-bibliotheque/",this.bibliotheque).subscribe(res => {
      console.log(res);
      this.ngOnInit();
    });
    this.bibliothequeService.emitObjectSubject();
    this.messageAlert("L'Adhérent "+this.bibliotheque.adherent?.nom+" "+this.bibliotheque.adherent?.prenom+" vient d'emprunter le livre "+this.bibliotheque.livre?.titre+" de "+this.bibliotheque.livre?.auteur?.nom+" "+this.bibliotheque.livre?.auteur?.prenom);
    this.bibliotheque = new Bibliotheque();

    this.resetData();
  }
  showPageAjout(){
    this.viewAjoutBibliotheque = true;
    console.log(new Date());
  }
  pristinePageAjout(){
    this.viewAjoutBibliotheque = false;
    this.bibliotheque = new Bibliotheque();
    this.resetData();
    this.estEnModeEdit = false;
  }

  deleteBibliotheque(id: number | undefined = 0){
    if(confirm("Vous êtes sûr de pouvoir supprimer cette historique d'emprunt ?\n")){
    
      /* this.bibliothequeService.supprimer(id); */
      this.bibliothequeService.deletT("bibliotheque/"+id+"/", this.bibliotheques.find((item) => {
        return item.id === id
      })).subscribe(res =>{
        let etat = res;
        this.ngOnInit();
      });
      this.bibliothequeService.emitObjectSubject();
      this.messageAlert("Une historique sur le livre emprunté a été supprimée");
    }
  }

  editBibliotheque(id: number){
    this.affecterData();
    /* this.bibliothequeService.modifier(id, this.bibliotheque); */
    this.bibliothequeService.modifyT("bibliotheque/"+this.bibliotheques.find((item, index) => {
      return index === id
    })?.id+"/", this.bibliotheque).subscribe(res => {
      let i = res;
      this.ngOnInit();
    });
    this.bibliothequeService.emitObjectSubject();

    this.messageAlert("L'historique sur l'emprunt du livre "+this.livreAModidifer+" par l'adhérent "+this.nomAModifier+" "+this.prenomAModifier+" a été modifiée en ( Livre : "+this.bibliotheque.livre?.titre+" ; Adhérent : "+this.bibliotheque.adherent?.nom+" "+this.bibliotheque.adherent?.prenom+" )");
    
    this.bibliothequeAModifier = null;
    this.nomAModifier = "";
    this.prenomAModifier = "";
    this.livreAModidifer = "";
    this.bibliotheque = new Bibliotheque();

    this.resetData();
    this.estEnModeEdit = false;
    this.viewAjoutBibliotheque = false;

    this.idBibliotheque = -1;
  }

  estVideLivresListeAndPreView(){
    if(this.livres.length === 0 && this.preView){
      return true;
    }
    return false;
  }
  showEditPage(id: number){
    this.estEnModeEdit = true;
    this.showPageAjout();
    this.bibliotheque = this.findElement(id);
    this.bibliothequeAModifier = this.findElement(id);
    this.nomAModifier = this.bibliothequeAModifier.adherent.nom;
    this.prenomAModifier = this.bibliothequeAModifier.adherent.prenom;
    this.livreAModidifer = this.bibliothequeAModifier.livre.titre;

    this.adherent.setValue(this.bibliotheque.adherent);
    this.livre.setValue(this.bibliotheque.livre);
    this.datePris.setValue(this.bibliotheque.datePris);
    this.dateRetour.setValue(this.bibliotheque.dateRetour);

    this.idBibliotheque = id;
  }
  findElement(id: number): Bibliotheque{
    return this.bibliotheques[id];
  }

  affecterData(){
    this.bibliotheque.adherent = this.adherent.value;
    this.bibliotheque.livre = this.livre.value;
    this.bibliotheque.datePris = (moment(new Date)).format('DD-MM-YYYY');
    this.bibliotheque.dateRetour = this.dateRetour.value;
  }

  resetData(){
    this.datePris.setValue((moment(new Date)).format('DD-MM-YYYY'));
    this.adherent.setValue(new Adherent());
    this.livre.setValue(new Livre());
    this.dateRetour.setValue(new Date());
  }

  messageAlert(message: string){
    this.afficheMessageAlert = true;
    this.message = message;
    setTimeout(() => {
      this.afficheMessageAlert = false;
      this.message = "";
    }, 4000);
  }


}
