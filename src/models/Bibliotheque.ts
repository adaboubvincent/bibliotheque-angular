import { Adherent } from './Adherent';
import { Livre } from './Livre';
import * as moment from 'moment';

export class Bibliotheque {
    public id?: number;
    public adherent?: Adherent;
    public livre?: Livre;
    public datePris?: string = (moment(new Date)).format('DD-MM-YYYY');
    public dateRetour?: Date;
    /* private static idIncrement: number = 0;

    constructor(adherent: Adherent, livre: Livre, datePris: string, dateRetour: Date){
        this.adherent = adherent;
        this.livre = livre;
        this.datePris = datePris;
        this.dateRetour = dateRetour;
        Bibliotheque.idIncrement++;
        this.id = Bibliotheque.idIncrement;
    }    

    public getId(){
        return this.id;
    } */
}