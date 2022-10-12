import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonneesPersonnellesComponent } from './donnees-personnelles.component';

describe('DonneesPersonnellesComponent', () => {
  let component: DonneesPersonnellesComponent;
  let fixture: ComponentFixture<DonneesPersonnellesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonneesPersonnellesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonneesPersonnellesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
