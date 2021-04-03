import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuteurComponent } from './auteur/auteur.component';
import { AuteurService } from './services/auteur/auteur.service';
import { AdherentService } from './services/adherent/adherent.service';
import { CategorieService } from './services/categorie/categorie.service';
import { LivreService } from './services/livre/livre.service';
import { CategorieComponent } from './categorie/categorie.component';
import { LivreComponent } from './livre/livre.component';
import { AdherentComponent } from './adherent/adherent.component';
import { BibliothequeComponent } from './bibliotheque/bibliotheque.component';
import { VisiteurComponent } from './visiteur/visiteur.component';

@NgModule({
  declarations: [
    AppComponent,
    AuteurComponent,
    CategorieComponent,
    LivreComponent,
    AdherentComponent,
    BibliothequeComponent,
    VisiteurComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxBootstrapIconsModule.pick(allIcons),
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AuteurService,
    AdherentService,
    CategorieService,
    LivreService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
