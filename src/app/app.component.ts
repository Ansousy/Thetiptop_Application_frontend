import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './auth/token-storage.service';
import { Title, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public roles: string[];
  public authority: string;
  title :string = 'TheTipTop Jeux Concours | thé infusion, thé signature';
  page:string;

  constructor(private tokenStorage: TokenStorageService,
              private titleService: Title,
              private metaService: Meta,
              private router: Router
              ) { }

  ngOnInit() {
    //referencement SEO
    this.titleService.setTitle(this.title);
    this.metaService.addTags([
      {name: 'keywords', content: ' thé haute gamme, thé bio, thé détox, thé vert amande citron'},
      {name: 'description', content: ' Participer aux jeux concours TheTipTop et gagner des coffrets' +
             ' de thé detox ou infusion et des thés signatures .' + ' Un an de thé gratuit à gagner ' +
             ' au tirage au sort final'},
      {name: 'robots', content: 'index, follow'}
    ]);


    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getAuthorities();
      this.roles.every(role => {
        if (role === 'ROLE_ADMIN') {
          this.authority = 'admin';
          return false;
        } else if (role === 'ROLE_EMP') {
          this.authority = 'emp';
          return false;
        }
        this.authority = 'user';
        return true;
      });
    }
  }
  /** deconnecter la session  **/
  logout(){
    this.tokenStorage.signOut();
  }

  accountLink(authority) {
      if (authority === 'user') {
        this.page = 'espace client';
        return ['user'];
      } else if (authority === 'admin') {
        this.page = 'espace admin';
        return ['admin'];
      } else if (authority === 'emp') {
        this.page = 'espace employe';
        return ['emp'];
      }
  }
  editionProfil(){
    this.router.navigate(['/user/profil']);
  }
  suppressionCompte(){
    this.router.navigate(['/user/suppression-compte']);
  }


}
