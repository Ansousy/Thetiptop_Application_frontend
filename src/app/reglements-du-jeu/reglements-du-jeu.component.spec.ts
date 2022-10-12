import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReglementsDuJeuComponent } from './reglements-du-jeu.component';

describe('ReglementsDuJeuComponent', () => {
  let component: ReglementsDuJeuComponent;
  let fixture: ComponentFixture<ReglementsDuJeuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReglementsDuJeuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReglementsDuJeuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
