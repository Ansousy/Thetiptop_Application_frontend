import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { EmployeComponent } from './employe/employe.component';
import { AdminComponent } from './admin/admin.component';
import { GainComponent } from './gain/gain.component';
import { AccesRefuseComponent } from './acces-refuse/acces-refuse.component';
import { EmailingComponent } from './emailing/emailing.component';
import { InfosGameComponent } from './infos-game/infos-game.component';
import { AjouterUtilisateurComponent } from './ajouter-utilisateur/ajouter-utilisateur.component';
import {AuthsecureGuard} from "./authsecure.guard";
import { MotDePasseOublierComponent } from './mot-de-passe-oublier/mot-de-passe-oublier.component';
import { ReinitialiserMotDePasseComponent } from './reinitialiser-mot-de-passe/reinitialiser-mot-de-passe.component';
import { ListeUtilisateursComponent } from './liste-utilisateurs/liste-utilisateurs.component';
import {EditionUtilisateurComponent} from "./edition-utilisateur/edition-utilisateur.component";
import {ConfirmationInscriptionComponent} from "./confirmation-inscription/confirmation-inscription.component";
import {ConfirmationNewsletterComponent} from "./confirmation-newsletter/confirmation-newsletter.component";
import {ProfilComponent} from "./profil/profil.component";
import {SuppressionCompteComponent} from "./suppression-compte/suppression-compte.component";
import {DonneesPersonnellesComponent} from './donnees-personnelles/donnees-personnelles.component';
import {MentionsLegalesComponent} from './mentions-legales/mentions-legales.component';
import {ErreurDeConfirmationComponent} from './erreur-de-confirmation/erreur-de-confirmation.component';
import {ConfirmationDeVotreInscriptionComponent} from './confirmation-de-votre-inscription/confirmation-de-votre-inscription.component';
import {ReglementsDuJeuComponent} from './reglements-du-jeu/reglements-du-jeu.component';





const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'user', canActivate: [AuthsecureGuard], data: {role: 'ROLE_USER'}, component: UserComponent},
    {path: 'emp', canActivate: [AuthsecureGuard], data: {role: 'ROLE_EMP'}, component: EmployeComponent},

    {path: 'user/gain',canActivate: [AuthsecureGuard], data: {role: 'ROLE_USER'}, component: GainComponent},
    {path: 'user/profil',canActivate: [AuthsecureGuard], data: {role: 'ROLE_USER'}, component: ProfilComponent},
    {path: 'user/suppression-compte',canActivate: [AuthsecureGuard], data: {role: 'ROLE_USER'}, component: SuppressionCompteComponent},

    {path: 'admin', canActivate: [AuthsecureGuard], data: {role: 'ROLE_ADMIN'}, component: AdminComponent},
    {path: 'admin/ajouter-utilisateur', canActivate: [AuthsecureGuard], data: {role: 'ROLE_ADMIN'}, component: AjouterUtilisateurComponent},
    {path: 'admin/emailing/:id', canActivate: [AuthsecureGuard], data: {role: 'ROLE_ADMIN'}, component: EmailingComponent},
    {path: 'admin/edition-utilisateur/:id', canActivate: [AuthsecureGuard], data: {role: 'ROLE_ADMIN'}, component: EditionUtilisateurComponent},
    {path: 'admin/liste-utilisateurs', canActivate: [AuthsecureGuard], data: {role: 'ROLE_ADMIN'}, component: ListeUtilisateursComponent},
    {path: 'home/confirmation-newsletter', component: ConfirmationNewsletterComponent},

    {path: 'auth/login', component: LoginComponent},
    {path: 'auth/signup', component: RegisterComponent},
    {path: 'auth/acces-refuse', component: AccesRefuseComponent},
    {path: 'auth/mot-de-passe-oublier', component: MotDePasseOublierComponent},
    {path: 'auth/reinitialiser-mot-de-passe/:token', component: ReinitialiserMotDePasseComponent},
    {path: 'auth/confirmation-inscription/:token', component: ConfirmationInscriptionComponent},
    {path: 'donnees-personnelles', component: DonneesPersonnellesComponent},
    {path: 'mentions-legales', component: MentionsLegalesComponent},
    {path: 'reglements-du-jeu', component: ReglementsDuJeuComponent},
    {path: 'auth/erreur-de-confirmation', component: ErreurDeConfirmationComponent},
    {path: 'auth/confirmation-de-votre-inscription', component: ConfirmationDeVotreInscriptionComponent},

     {
        path: '**',
        redirectTo: 'home',
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled',
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'top'
})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
