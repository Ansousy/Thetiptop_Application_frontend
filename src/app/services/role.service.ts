import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private listeUserUrl = environment.apiUrl + '/api/test/admin/liste-roles';

  constructor(private http: HttpClient) {}

  getRoleList(): Observable<any> {
    return this.http.get<any>(this.listeUserUrl);
  }

}
