import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Gain} from "../model/gain.model";
import {Ticket} from "../model/ticket.model";
import {environment} from "../../environments/environment";
import {TokenStorageService} from "../auth/token-storage.service";
import {User} from "../model/user.model";
import {UserInfo} from "../model/userinfo.model";


const httpOptions = {
  headers: new HttpHeaders({'Access-Control-Allow-Origin': 'application/json'})
};


@Injectable({
  providedIn: 'root'
})
export class JouerService {

  constructor(public httpClient: HttpClient,
              public tokenstorage: TokenStorageService) {
  }


  /***********************   Employe     *************************
   **                                                              **
   **                                                              **
   *******************************************************************/

  //liste des utilisateurs et leurs gains
  listUtilisateursGains(page: number, size: number): Observable<any> {
    return this.httpClient.get<Gain>(environment.apiUrl + "/api/test/employe/listes/gains?page="+page+"&size="+ size)
      .pipe(catchError(this.handleError));
  }


  //Confirmer Reception gais
  ConfirmerReceptionGain(gain: Gain): Observable<any> {
    return this.httpClient.put<Gain>(environment.apiUrl + "/api/test/employe/valider/" + gain.id, gain)
      .pipe();
  }

  //Confirmer Reception gais
  InfirmerReceptionGain(gain: Gain): Observable<any> {
    return this.httpClient.put<Gain>(environment.apiUrl + "/api/test/employe/valider/" + gain.id, gain)
      .pipe();
  }
  /////////////////////filtrer par nom user et libelle du gain
  filtrerParNomEtNumeroTicket(ticket: string, nom: string, page: number, size: number): Observable<any> {
    return this.httpClient.get<any>(environment.apiUrl +
      `/api/test/employe/filtrer?ticket=${ticket}&nom=${nom}&page=${page}&size=${size}`)
      .pipe();
  }


  /***********************   Admin     *****************************
   **                                                              **
   **                                                              **
   *******************************************************************/


  //liste des utilisateurs et leurs gains
  envoieEmail(dataForm: any): Observable<any> {
    return this.httpClient.post<any>(environment.apiUrl + "/api/test/admin/email", dataForm)
      .pipe();
  }

  //liste des utilisateurs et leurs gains
  listUtilisateursGainsAdmin(page: number, size: number): Observable<any> {
    return this.httpClient.get<any>(environment.apiUrl + "/api/test/admin/listes/gains?page=" + page + "&size=" + size)
      .pipe();
  }

  //liste des utilisateurs et leurs gains
  gainParIdentifiant(id: number): Observable<any> {
    return this.httpClient.get<any>(environment.apiUrl + "/api/test/admin/listes/gains/" + id)
      .pipe();
  }

  /////////////////////Nombre de participant
  nombreDeParticipant(): Observable<any> {
    return this.httpClient.get(environment.apiUrl + "/api/test/admin/nombre/participants")
      .pipe();
  }


  /////////////////////Nombre de participant
  ticketsRestants(): Observable<any> {
    return this.httpClient.get(environment.apiUrl + "/api/test/admin/tickets/restants")
      .pipe();
  }

  /////////////////////Nombre total de tickets
  ticketsTotal(): Observable<any> {
    return this.httpClient.get(environment.apiUrl + "/api/test/admin/tickets/total")
      .pipe();
  }

  /////////////////////Répartitions des tickets en pourcentage -> Diagramme de cercle
  tauxDeRepartitions(): Observable<any> {
    return this.httpClient.get(environment.apiUrl + "/api/test/admin/tickets/repartitions")
      .pipe();
  }

  /////////////////////Evolution des tickets  -> Histogramme
  evolutionsTickets(): Observable<any> {
    return this.httpClient.get(environment.apiUrl + "/api/test/admin/tickets/evolutions")
      .pipe();
  }

  /////////////////////Evolution des tickets  -> Histogramme
  genererTickets(): Observable<any> {
    return this.httpClient.get(environment.apiUrl + "/api/test/admin/generer/tickets")
      .pipe();
  }

  /////////////////////Tirage au sort
  grandTirageAuSort(): Observable<any> {
    return this.httpClient.get<any>(environment.apiUrl + "/api/test/admin/tirage-au-sort")
      .pipe();
  }

  /////////////////////user-> gagnant grand tirage au sort
  utilisateurGagner(): Observable<any> {
    return this.httpClient.get<any>(environment.apiUrl + "/api/test/admin/client/gagnant")
      .pipe();
  }

  /////////////////////user by id
  utilisateurInfo(id: number): Observable<any> {
    return this.httpClient.get<any>(environment.apiUrl + "/api/test/admin/utilisateur/info/" + id)
      .pipe();
  }

  /////////////////////update utilisateur
  updateUtilisateur(utilisateur: UserInfo) {
    return this.httpClient.put(environment.apiUrl + "/api/test/user/edition/profil", utilisateur)
      .pipe();
  }

  /////////////////////filtrer par nom user et libelle du gain
  filtrerParNomEtLibelle(libelle: string, nom: string, page: number, size: number): Observable<any> {
    return this.httpClient.get<any>(environment.apiUrl +
      `/api/test/admin/filtrer?libelle=${libelle}&nom=${nom}&page=${page}&size=${size}`)
      .pipe();
  }

  //Envoyer campagne
  envoieCampagneNewsletter(): Observable<any> {
    return this.httpClient.get<any>(environment.apiUrl + "/api/test/admin/envoyer/campagne")
      .pipe();
  }

  /***********************   User     ******************************
   **                                                              **
   **                                                              **
   *******************************************************************/
  //liste des utilisateurs et leurs gains
  participerJeux(ticket: Ticket): Observable<string> {
    return this.httpClient.post<string>(environment.apiUrl + "/api/test/user/jouer/" + this.tokenstorage.getId(), ticket, httpOptions)
      .pipe();
  }

  //Utilisateur et ses gains
  gainsUtilisateurs(page: number, size: number): Observable<any> {
    return this.httpClient.get<Gain>(environment.apiUrl + "/api/test/user/listes/gains/"+ this.tokenstorage.getId()+"?page=" + page + "&size=" + size)
      .pipe();
  }
  //filtrer gains Utilisateur
  filtrerLibelleParGainUtilisateur(libelle:string, page: number, size: number): Observable<any> {
    return this.httpClient.get<Gain>(environment.apiUrl + "/api/test/user/filtrer/libelle/"+ this.tokenstorage.getId()+"?libelle=" + libelle + "&page=" + page+ "&size=" + size)
      .pipe();
  }
  /////////////////////user by id
  getUser(): Observable<any> {
    return this.httpClient.get<any>(environment.apiUrl + "/api/test/user/info/" + this.tokenstorage.getId())
      .pipe();
  }

  /***********************   Intercept     *************************
   **                                                              **
   **                                                              **
   *******************************************************************/
  /***** intercepter les erreurs ****/
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  };


}
