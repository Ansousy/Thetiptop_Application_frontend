import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {UserInfo} from '../model/userinfo.model';
import {Gain} from '../model/gain.model';
import {JwtResponse} from '../auth/jwt-response';
import {User} from '../model/user.model';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = environment.apiUrl + '/api/test/user';
  private empUrl = environment.apiUrl + '/api/test/employe';
  private adminUrl = environment.apiUrl + '/api/test/admin';
  private listeUserUrl = environment.apiUrl + '/api/test/admin/liste-utilisateurs';
  private deleteUserUrl = environment.apiUrl + '/api/deleteUser';
  private updateUserUrl = environment.apiUrl + '/api/auth/updateUser';
  private createUserUrl = environment.apiUrl + '/api/auth/addUser';
  private unsubscribeUrl = environment.apiUrl + '/api/test/user/desinscription/news';
  private updateProfilUser = environment.apiUrl + '/api/test/user/completer/profil/user';

  constructor(private http: HttpClient) {
  }

  getUserBoard(): Observable<any> {
    return this.http.get(this.userUrl);
  }

  getEmployeBoard(): Observable<any> {
    return this.http.get(this.empUrl);
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(this.adminUrl);
  }

  filtrerParNomUser(nom: string, page: number, size: number): Observable<any> {
    return this.http.get<any>(environment.apiUrl +
      `/api/test/admin/filtrer/nom/user?nom=${nom}&page=${page}&size=${size}`);
  }

  getUserList(page: number, size: number): Observable<any> {
    return this.http.get<Gain>(this.listeUserUrl + '?page=' + page + '&size=' + size);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.createUserUrl, user, httpOptions);
  }

  deleteUser(id): Observable<any> {
    return this.http.delete(this.deleteUserUrl + '/' + id);
  }

  updateUser(userInfo: User): Observable<UserInfo> {
    return this.http.put<UserInfo>(this.updateUserUrl, userInfo, httpOptions);
  }
  unsubscribeUser(email: any): Observable<any> {
    return this.http.post<any>(this.unsubscribeUrl, email);
  }
  completedProfilUser(user: any): Observable<any> {
    return this.http.put<any>(this.updateProfilUser, user);
  }
}
