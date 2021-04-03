import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuteurComponent } from './auteur/auteur.component';
import { CategorieComponent } from './categorie/categorie.component';
import { LivreComponent } from './livre/livre.component';
import { AdherentComponent } from './adherent/adherent.component';
import { BibliothequeComponent } from './bibliotheque/bibliotheque.component';
import { VisiteurComponent } from './visiteur/visiteur.component';

const routes: Routes = [
  {path: '', component: VisiteurComponent},
  {path: 'auteur', component: AuteurComponent},
  {path: 'categorie', component: CategorieComponent},
  {path: 'livre', component: LivreComponent},
  {path: 'inscrire-adherent', component: AdherentComponent},
  {path: 'bibliotheque', component: BibliothequeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
