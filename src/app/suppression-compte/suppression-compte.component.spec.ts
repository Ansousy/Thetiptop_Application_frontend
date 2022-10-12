import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppressionCompteComponent } from './suppression-compte.component';

describe('SuppressionCompteComponent', () => {
  let component: SuppressionCompteComponent;
  let fixture: ComponentFixture<SuppressionCompteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuppressionCompteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuppressionCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
