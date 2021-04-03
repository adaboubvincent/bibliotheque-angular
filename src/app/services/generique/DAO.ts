import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment.prod';

@Injectable({
    providedIn: 'root'
  })
export class DAO<T> {
    protected liste: Array<T> = Array<T>();
    url: string;
    public objectSubject = new Subject<T[]>();
    constructor(protected http: HttpClient) {
        const APIEndpoint = environment.APIEndpoint;
        this.url = APIEndpoint + 'api/';
    }
    getAll(url: string): Observable<Array<T>>{
        return this.http.get<Array<T>>(this.url + url);
    }
    addT(url: string, t: T){
        return this.http.post(this.url + url, t);
    }
    deletT(url: string, t?: T){
        /* const optionRequete = {
            headers: new HttpHeaders({ 
              'Access-Control-Allow-Origin':'*',
              'mon-entete-personnalise':'maValeur'
            })
          }; */
        const options = {
          headers: new HttpHeaders({
            //'Access-Control-Allow-Origin' : '*',
            //'Access-Control-Allow-Headers' : 'Content-Type',
            //'Access-Control-Allow-Credentials': 'true',
            'Content-Type': 'application/json',
          }),
          bodey: t
        };
        return this.http.delete(this.url + url, options);
    }
    modifyT(url: string, t: T){
/*         header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token'); */
        /* const options = {
            headers: new HttpHeaders({
              'Access-Control-Allow-Origin' : '*',
              'Access-Control-Allow-Methods' : 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
              'Access-Control-Allow-Headers' : 'Origin, Content-Type, X-Auth-Token',
              //'Access-Control-Allow-Credentials': 'true',
              'Content-Type': 'application/json',
            }),
            bodey: t,
            withCredentials: true
          }; */
        return this.http.put(this.url + url, t);
    }

    emitObjectSubject(){
        this.objectSubject.next(this.liste.slice());
    }

    ajouter(t: T){
        this.liste.push(t);
        this.emitObjectSubject();
    }

    supprimer(id: number){
        this.liste = this.liste.filter((item, index) => index !== id);
        this.emitObjectSubject();
    }

    modifier(id: number, t: T){
        this.liste[id] = t;
    }


}