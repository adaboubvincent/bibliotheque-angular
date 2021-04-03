import { Injectable } from '@angular/core';
import { Bibliotheque } from 'src/models/Bibliotheque';
import { DAO } from '../generique/DAO';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BibliothequeService extends DAO<Bibliotheque> {

  constructor(http: HttpClient) { 
    super(http);
  }
}
