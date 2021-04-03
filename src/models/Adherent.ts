export class Adherent {
    public id?: number;
    public nom?: string;
    public prenom?: string;
    public telephone?: string;
    public email?: string;
    /* private idNumero: string;
    private static idIcrement: number = 0; */
    /* constructor(nom: string, prenom:string, telephone: string, email: string){
        this.nom = nom;
        this.prenom = prenom;
        this.telephone = telephone;
        this.email = email;
        Adherent.idIcrement++;
        this.id = Adherent.idIcrement;
        this.idNumero = ""+Adherent.idIcrement;
        if(this.idNumero.length === 1){
            this.idNumero = "00"+this.idNumero;
        }else if(this.idNumero.length === 2){
            this.idNumero = "0"+this.idNumero;
        }
    }
    
    public getId(){
        return this.id;
    }
    public getIdNumero(): string{
        return this.idNumero
    } */

}