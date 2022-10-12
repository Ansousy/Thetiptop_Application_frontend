import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUsername';
const AUTHORITIES_KEY = 'AuthAuthorities';
const ID_KEY = 'AuthUsername';




@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private roles: Array<string> = [];
  constructor() { }

  signOut() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.clear();
    window.location.replace("/auth/login");

  }

  public saveToken(token: string) {
     localStorage.removeItem(TOKEN_KEY);
     localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return localStorage.getItem(TOKEN_KEY);
  }

  public saveUsername(login: string) {
     localStorage.removeItem(USERNAME_KEY);
     localStorage.setItem(USERNAME_KEY, login);
  }

  public getUsername(): string {
    return localStorage.getItem(USERNAME_KEY);
  }

  public saveAuthorities(authorities: string[]) {
     localStorage.removeItem(AUTHORITIES_KEY);
     localStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }

  public getAuthorities(): string[] {
    this.roles = [];

    if (localStorage.getItem(TOKEN_KEY)) {
      JSON.parse(localStorage.getItem(AUTHORITIES_KEY)).forEach(authority => {
        this.roles.push(authority);
      });
    }

    return this.roles;
  }
   public saveId(id:any) {
      // const part = JSON.parse(atob(token.split('.')[1]));
        //var tab = Object.values(part);
        //const id=tab[1];
        //console.log(id)
        localStorage.removeItem(ID_KEY);
        localStorage.setItem(ID_KEY, id);
   }

   public getId(): string {
     return localStorage.getItem(ID_KEY);
   }


}
