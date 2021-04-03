import { Injectable } from '@angular/core';
import { Categorie } from '../../../models/Categorie';
import { DAO } from '../generique/DAO';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategorieService extends DAO<Categorie> {

  constructor(http: HttpClient) { 
    super(http);
  }
}
