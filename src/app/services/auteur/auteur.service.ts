import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { DAO } from '../generique/DAO';
import {Auteur} from '../../../models/Auteur';

@Injectable({
  providedIn: 'root'
})
export class AuteurService extends DAO<Auteur> {
  /* private listeAuteur: Array<Auteur> = Array<Auteur>();
  public auteursSubject = new Subject<Auteur[]>(); */
  constructor(http: HttpClient) {
    super(http);
  }
/* 
  emitAuteurSubject(){
    this.auteursSubject.next(this.listeAuteur.slice());
  }

  ajouterAuteur(auteur: Auteur){
    this.listeAuteur.push(auteur);
    this.emitAuteurSubject();
  }

  supprimerAuteur(id: number){
    this.listeAuteur = this.listeAuteur.filter((item, index) => index !== id);
    this.emitAuteurSubject();
  }

  modifierAuteur(id: number, auteur: Auteur){
    this.listeAuteur[id] = auteur;
  } */

}
