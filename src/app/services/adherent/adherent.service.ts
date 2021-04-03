import { Injectable } from '@angular/core';
import { Adherent } from 'src/models/Adherent';
import { DAO } from '../generique/DAO';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdherentService extends DAO<Adherent> {

  constructor(http: HttpClient) { 
    super(http);
  }
}
