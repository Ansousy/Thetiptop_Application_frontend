import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';

import { EditionUtilisateurComponent } from './edition-utilisateur.component';

describe('EditionUtilisateurComponent', () => {
  let component: EditionUtilisateurComponent;
  let fixture: ComponentFixture<EditionUtilisateurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditionUtilisateurComponent ],
      imports: [ToastrModule.forRoot(),RouterModule.forRoot([]),HttpClientTestingModule,FormsModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditionUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
