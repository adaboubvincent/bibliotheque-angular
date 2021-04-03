import { Component, OnInit } from '@angular/core';
import { Livre } from 'src/models/Livre';
import { LivreService } from '../services/livre/livre.service';
import { FormBuilder, Validators } from '@angular/forms';
import * as $ from 'jquery';
import 'jquery-ui';
import { Categorie } from 'src/models/Categorie';
import { Auteur } from 'src/models/Auteur';
import { AuteurService } from '../services/auteur/auteur.service';
import { CategorieService } from '../services/categorie/categorie.service';

@Component({
  selector: 'app-livre',
  templateUrl: './livre.component.html',
  styleUrls: ['./livre.component.css']
})
export class LivreComponent implements OnInit {
  afficheMessageAlert = false;
  message = "";
  titreAModifier: string | undefined = "";
  nomAModifier: string | undefined ="";
  prenomAModifier: string | undefined = "";
  categorieAModifier: string | undefined = "";

  submitted: boolean = false;
  viewAjoutLivre: boolean = true;
  estEnModeEdit = false;
  preView: boolean = true;

  idLivre: number = -1;

  livres: Livre[] = [];
  auteurs: Auteur[] = [];
  categories: Categorie[] = [];

  titre = this.fb.control('', Validators.required);
  categorie = this.fb.control(new Categorie(), Validators.required, );
  auteur = this.fb.control(new Auteur(), Validators.required, );
  editeur = this.fb.control('', Validators.required);
  livre: Livre = new Livre();

  constructor(private livreService: LivreService, private fb: FormBuilder, private auteurService: AuteurService, private categorieService: CategorieService) { }

  ngOnInit(): void {
    /* this.livreService.objectSubject.subscribe((livs: Livre[]) => {
      this.livres = livs;
    });
    this.livreService.emitObjectSubject();
    this.auteurService.objectSubject.subscribe((auts: Auteur[]) => {
      this.auteurs = auts;
    });
    this.auteurService.emitObjectSubject();
    this.categorieService.objectSubject.subscribe((cats: Categorie[]) => {
      this.categories = cats;
    });
    this.categorieService.emitObjectSubject(); */
    this.livreService.getAll("livres/").subscribe((livs: Livre[]) => {
      this.livres = livs;
    });
    this.livreService.emitObjectSubject();
    this.auteurService.getAll("auteurs/").subscribe((auts: Auteur[]) => {
      this.auteurs = auts;
    });
    this.auteurService.emitObjectSubject();
    this.categorieService.getAll("categories/").subscribe((cats: Categorie[]) => {
      this.categories = cats;
    });
    this.categorieService.emitObjectSubject();
  }

  onSubmit(){
    this.submitted = true;
  }

  addLivre(){
    this.preView = false;
    this.affecterData();
    //this.livre.setNumeroISBN(this.categorie.value);
    /* this.livreService.ajouter(this.livre); */
    console.log(this.livre);
    
    this.livreService.addT("ajout-livre/",this.livre).subscribe(res => {
      console.log(res);
      this.ngOnInit();
    });
    this.livreService.emitObjectSubject();
    this.messageAlert("Le livre "+this.livre.titre+" de "+this.livre.auteur?.nom+" "+this.livre.auteur?.prenom+" vient d'être ajouté dans la catégorie "+this.livre.categorie?.titre);
    this.livre = new Livre();
    this.resetData();
  }
  showPageAjout(){
    this.viewAjoutLivre = true;
  }
  pristinePageAjout(){
    this.viewAjoutLivre = false;
    this.livre = new Livre();
    this.resetData();
    this.estEnModeEdit = false;
  }

  deleteLivre(id: number | undefined = 0){
    if(confirm("Vous êtes sûr de pouvoir supprimer cet livre ?\nUne fois supprimée cet livre toutes historique concernant cet livre séront supprimées également dans cette bibliothèque.")){
    
      /* this.livreService.supprimer(id); */
      this.livreService.deletT("livre/"+id+"/", this.livres.find((item) => {
        return item.id === id
      })).subscribe(res =>{
        let etat = res;
        this.ngOnInit();
      });
      this.livreService.emitObjectSubject();
      this.messageAlert("Un livre a été supprimé");
    }
  }

  editLivre(id: number){
    this.affecterData();
    /* this.livreService.modifier(id, this.livre); */
    this.livreService.modifyT("livre/"+this.livres.find((item, index) => {
      return index === id
    })?.id+"/", this.livre).subscribe(res => {
      let i = res;
      this.ngOnInit();
    });
    this.livreService.emitObjectSubject();
    this.messageAlert("Le livre "+this.titreAModifier+" de "+this.nomAModifier+" "+this.prenomAModifier+" de la catégorie"+this.categorieAModifier+" vient d'être modifié en "+this.livre.titre+" de "+this.livre.auteur?.nom+" "+this.livre.auteur?.prenom+" de la catégorie"+this.livre.categorie?.titre);
    
    this.titreAModifier = "";
    this.nomAModifier ="";
    this.prenomAModifier = "";
    this.categorieAModifier = "";
    this.livre = new Livre();
    this.resetData();
    this.estEnModeEdit = false;
    this.viewAjoutLivre = false;

    this.idLivre = -1;
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

    this.livre = this.findElement(id);
    this.titreAModifier = this.findElement(id).titre;
    this.nomAModifier = this.findElement(id).auteur?.nom;
    this.prenomAModifier = this.findElement(id).auteur?.prenom;
    this.categorieAModifier = this.findElement(id).categorie?.titre;
    
    
    this.titre.setValue(this.livre.titre);
    this.categorie.setValue(this.livre.categorie);
    this.auteur.setValue(this.livre.auteur);
    this.editeur.setValue(this.livre.editeur);

    this.idLivre = id;
  }
  findElement(id: number): Livre{
    return this.livres[id];
  }

  affecterData(){
    this.livre.titre = this.titre.value;
    this.livre.categorie = this.categorie.value;
    this.livre.auteur = this.auteur.value;
    this.livre.editeur = this.editeur.value;
  }

  resetData(){
    this.titre.setValue("");
    this.categorie.setValue(new Categorie());
    this.auteur.setValue(new Auteur());
    this.editeur.setValue("");
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
