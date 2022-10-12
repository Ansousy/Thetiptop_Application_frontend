import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErreurDeConfirmationComponent } from './erreur-de-confirmation.component';

describe('ErreurDeConfirmationComponent', () => {
  let component: ErreurDeConfirmationComponent;
  let fixture: ComponentFixture<ErreurDeConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErreurDeConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErreurDeConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
