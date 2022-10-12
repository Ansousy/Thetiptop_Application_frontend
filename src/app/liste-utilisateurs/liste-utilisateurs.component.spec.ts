import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';

import { ListeUtilisateursComponent } from './liste-utilisateurs.component';

describe('ListeUtilisateursComponent', () => {
  let component: ListeUtilisateursComponent;
  let fixture: ComponentFixture<ListeUtilisateursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeUtilisateursComponent ],
      imports: [NgxPaginationModule,HttpClientTestingModule,ToastrModule.forRoot(),RouterModule.forRoot([])], 
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeUtilisateursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
