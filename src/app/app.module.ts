import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GoogleChartsModule } from 'angular-google-charts';
import { HttpModule } from '@angular/http';
import {ProgressBarModule} from "angular-progress-bar"
import {Ng2SearchPipeModule} from "ng2-search-filter";
import {Ng2OrderModule} from "ng2-order-pipe";
import {NgxPaginationModule} from "ngx-pagination";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from "angular2-cookie/services/cookies.service";
import {NgcCookieConsentModule, NgcCookieConsentConfig} from 'ngx-cookieconsent';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { EmployeComponent } from './employe/employe.component';

import { httpInterceptorProviders } from './auth/auth-interceptor';
import { AccesRefuseComponent } from './acces-refuse/acces-refuse.component';
import { GainComponent } from './gain/gain.component';
import { ProfilComponent } from './profil/profil.component';
import { EmailingComponent } from './emailing/emailing.component';
import { InfosGameComponent } from './infos-game/infos-game.component';
import { AjouterUtilisateurComponent } from './ajouter-utilisateur/ajouter-utilisateur.component';

import {SocialLoginModule, SocialAuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider} from 'angularx-social-login';
import { MotDePasseOublierComponent } from './mot-de-passe-oublier/mot-de-passe-oublier.component';
import { ReinitialiserMotDePasseComponent } from './reinitialiser-mot-de-passe/reinitialiser-mot-de-passe.component';
import { InfosJeuxAdminComponent } from './infos-jeux-admin/infos-jeux-admin.component';
import { ListeUtilisateursComponent } from './liste-utilisateurs/liste-utilisateurs.component';
import {DeleteUserModalComponent} from './delete-user-modal/delete-user-modal.component';
import {UpdateUserModalComponent} from './update-user-modal/update-user-modal.component';
import { EditionUtilisateurComponent } from './edition-utilisateur/edition-utilisateur.component';
import { TirageComponent } from './tirage/tirage.component';
import { ConfirmationInscriptionComponent } from './confirmation-inscription/confirmation-inscription.component';
import { ConfirmationNewsletterComponent } from './confirmation-newsletter/confirmation-newsletter.component';
import { SuppressionCompteComponent } from './suppression-compte/suppression-compte.component';
import { DonneesPersonnellesComponent } from './donnees-personnelles/donnees-personnelles.component';
import { ErreurDeConfirmationComponent } from './erreur-de-confirmation/erreur-de-confirmation.component';
import { MentionsLegalesComponent } from './mentions-legales/mentions-legales.component';
import { ConfirmationDeVotreInscriptionComponent } from './confirmation-de-votre-inscription/confirmation-de-votre-inscription.component';
import { ReglementsDuJeuComponent } from './reglements-du-jeu/reglements-du-jeu.component';

const cookieConfig:NgcCookieConsentConfig = {
  cookie: {
    domain: 'dsp-archiweb21-ah-es-ag-hk.fr',
    expiryDays: 1
  },
  palette: {
    popup: {
      background: '#383b75'
    },
    button: {
      background: '#f1d600'
    }
  },
  theme: 'classic',
  type: 'opt-out',
  layout: 'my-custom-layout',
  layouts: {
    "my-custom-layout": '{{messagelink}}{{compliance}}'
  },
  elements:{
    messagelink: `
    <span id="cookieconsent:desc" class="cc-message">{{message}}
      <a aria-label="learn more about cookies" tabindex="0" class="cc-link" href="{{cookiePolicyHref}}" target="_blank">{{cookiePolicyLink}}</a>
      <!--
      <a aria-label="learn more about our privacy policy" tabindex="1" class="cc-link" href="{{privacyPolicyHref}}" target="_blank">{{privacyPolicyLink}}</a> and our
      <a aria-label="learn more about our terms of service" tabindex="2" class="cc-link" href="{{tosHref}}" target="_blank">{{tosLink}}</a>
    -->
    </span>
    `,
  },
  content:{
    message: 'Nous utilisons des cookies pour analyser le trafic du site Web et optimiser votre expérience sur le site Web ',
    cookiePolicyLink: 'Politique de cookie ',
    cookiePolicyHref: 'https://www.cookiebot.com/fr/cookie-policy-rgpd',
    allow: 'Autoriser',
    deny: 'Refuser'


    //privacyPolicyLink: 'Privacy Policy',
    //privacyPolicyHref: 'https://privacy.com',

    //tosLink: 'Terms of Service',
    //tosHref: 'https://tos.com',
  }
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    RegisterComponent,
    HomeComponent,
    AdminComponent,
    EmployeComponent,
    AccesRefuseComponent,
    GainComponent,
    ProfilComponent,
    EmailingComponent,
    InfosGameComponent,
    AjouterUtilisateurComponent,
    MotDePasseOublierComponent,
    ReinitialiserMotDePasseComponent,
    InfosJeuxAdminComponent,
    ListeUtilisateursComponent,
    DeleteUserModalComponent,
    UpdateUserModalComponent,
    EditionUtilisateurComponent,
    TirageComponent,
    ConfirmationInscriptionComponent,
    ConfirmationNewsletterComponent,
    SuppressionCompteComponent,
    DonneesPersonnellesComponent,
    ErreurDeConfirmationComponent,
    MentionsLegalesComponent,
    ConfirmationDeVotreInscriptionComponent,
    ReglementsDuJeuComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'AngularJwtAuth'}),
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    NgxPaginationModule,
    HttpModule,
    ProgressBarModule,
    BrowserAnimationsModule,
    GoogleChartsModule.forRoot(),
    SocialLoginModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      timeOut: 8000,
      progressBar: true,
      closeButton: true
    }),
    NgbModule,
    NgcCookieConsentModule.forRoot(cookieConfig)
  ],
  providers: [
    httpInterceptorProviders,
    CookieService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            // Prod key :
             provider: new GoogleLoginProvider('803234267619-h06dfo60mmq0eodljju2pmmikvfkcqkj.apps.googleusercontent.com')
            // localhost key:
             //provider: new GoogleLoginProvider('778933620479-3ens5a93he1u5pv2s96jnqaoqv3f22vd.apps.googleusercontent.com')
          },
          {

            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('273814998097885')
          },
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
