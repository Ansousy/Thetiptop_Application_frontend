import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';

import { ConfirmationInscriptionComponent } from './confirmation-inscription.component';

describe('ConfirmationInscriptionComponent', () => {
  let component: ConfirmationInscriptionComponent;
  let fixture: ComponentFixture<ConfirmationInscriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationInscriptionComponent ],
      imports: [HttpClientTestingModule, RouterModule.forRoot([]),ToastrModule.forRoot()], 
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationInscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
