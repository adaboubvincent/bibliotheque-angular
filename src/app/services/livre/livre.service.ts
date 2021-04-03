import { Injectable } from '@angular/core';
import { Livre } from 'src/models/Livre';
import { DAO } from '../generique/DAO';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LivreService extends DAO<Livre> {

  constructor(http: HttpClient) { 
    super(http);
  }
}
