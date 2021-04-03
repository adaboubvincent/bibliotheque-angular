import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategorieService } from '../services/categorie/categorie.service';
import { FormBuilder, Validators } from '@angular/forms';
import * as $ from 'jquery';
import 'jquery-ui';
import { Subscription } from 'rxjs'
import { Categorie } from '../../models/Categorie';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit {
  afficheMessageAlert = false;
  message = "";
  titreAModifier: string | undefined = "";

  submitted: boolean = false;
  viewAjoutCategorie: boolean = true;
  estEnModeEdit = false;
  preView: boolean = true;
  categories: Categorie[] = [];
  idCategorie: number = -1;

  titre = this.fb.control('', Validators.required);
  description = this.fb.control('', Validators.required);
  categorie: Categorie = new Categorie();
  constructor(private categorieService: CategorieService, private fb: FormBuilder) { }

  ngOnInit(): void {
    /* this.categorieService.objectSubject.subscribe((cats: Categorie[]) => {
      this.categories = cats;
    });
    this.categorieService.emitObjectSubject(); */
    this.categorieService.getAll("categories/").subscribe((cats: Categorie[]) => {
      this.categories = cats;
    });
    this.categorieService.emitObjectSubject();
  }

  
  onSubmit(){
    this.submitted = true;
  }

  addCategorie(){
    this.preView = false;
    this.affecterData();
    /* this.categorieService.ajouter(this.categorie); */
    this.categorieService.addT("ajout-categorie/",this.categorie).subscribe(res => {
      console.log(res);
      this.ngOnInit();
    });
    this.categorieService.emitObjectSubject();
    this.messageAlert("La catégorie "+this.categorie.titre+" est bien ajouté");
    this.categorie = new Categorie();
    this.resetData();
  }
  showPageAjout(){
    this.viewAjoutCategorie = true;
  }
  pristinePageAjout(){
    this.viewAjoutCategorie = false;
    this.categorie = new Categorie();
    this.resetData();
    this.estEnModeEdit = false;
  }

  deleteCategorie(id: number | undefined = 0){
    if(confirm("Vous êtes sûr de pouvoir supprimer cette catégorie ?\nUne fois supprimée cette catégorie tous les livres ainsi que les historique d'emprunt sur ces livres dans cette catégorie séront supprimés également dans cette bibliothèque.")){
    
      /* this.categorieService.supprimer(id); */
      this.categorieService.deletT("categorie/"+id+"/", this.categories.find((item) => {
        return item.id === id
      })).subscribe(res =>{
        let etat = res;
        this.ngOnInit();
      });
      this.categorieService.emitObjectSubject();
      this.messageAlert("Une catégorie a été supprimée");
    }
  }

  editCategorie(id: number){
    this.affecterData();
    /* this.categorieService.modifier(id, this.categorie); */
    this.categorieService.modifyT("categorie/"+this.categories.find((item, index) => {
      return index === id
    })?.id+"/", this.categorie).subscribe(res => {
      let i = res;
      this.ngOnInit();
    });
    this.categorieService.emitObjectSubject();
    this.messageAlert("La catégorie "+this.titreAModifier+" vient d'être modifié en "+this.categorie.titre);
    
    this.titreAModifier = "";
    this.categorie = new Categorie();
    this.resetData();
    this.estEnModeEdit = false;
    this.viewAjoutCategorie = false;

    this.idCategorie = -1;
  }

  estVideCategoriesListeAndPreView(){
    if(this.categories.length === 0 && this.preView){
      return true;
    }
    return false;
  }
  showEditPage(id: number){
    this.estEnModeEdit = true;
    this.showPageAjout();

    this.categorie = this.findElement(id);
    this.titreAModifier = this.findElement(id).titre;


    this.titre.setValue(this.categorie.titre);
    this.description.setValue(this.categorie.description);

    this.idCategorie = id;
  }
  findElement(id: number): Categorie{
    return this.categories[id];
  }

  affecterData(){
    this.categorie.titre = this.titre.value;
    this.categorie.description = this.description.value;
  }

  resetData(){
    this.titre.setValue('');
    this.description.setValue('');
  }

  
  messageAlert(message: string){
    this.afficheMessageAlert = true;
    this.message = message;
    setTimeout(() => {
      this.afficheMessageAlert = false;
      this.message = "";
    }, 3000);
  }


}
