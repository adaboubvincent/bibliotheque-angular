import { Auteur } from './Auteur';
import { Categorie } from './Categorie';

export class Livre {
    public id?: number = 0;
    public titre?: string;
    public categorie?: Categorie;
    public auteur?: Auteur;
    public editeur?: string;
    /* private numeroISBN: string;
    private static idIncrement: number = 0;

    constructor(titre: string, categorie: Categorie, auteur: Auteur, editeur: string){
        this.titre = titre;
        this.auteur = auteur;
        this.categorie = categorie;
        this.editeur = editeur;
        this.numeroISBN = "";
        Livre.idIncrement++;
        this.id = Livre.idIncrement;
        this.numeroISBN = "" + Livre.idIncrement;
    }

    public getId(){
        return this.id;
    }

    public setNumeroISBN(categorie: Categorie){
        this.numeroISBN = categorie.titre +  this.numeroISBN;
    }

    public getNumeroISBN(){
        return this.numeroISBN;
    } */

}