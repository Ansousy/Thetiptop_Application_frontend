import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationDeVotreInscriptionComponent } from './confirmation-de-votre-inscription.component';

describe('ConfirmationDeVotreInscriptionComponent', () => {
  let component: ConfirmationDeVotreInscriptionComponent;
  let fixture: ComponentFixture<ConfirmationDeVotreInscriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationDeVotreInscriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationDeVotreInscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
