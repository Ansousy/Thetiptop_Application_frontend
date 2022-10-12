import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';

import { ReinitialiserMotDePasseComponent } from './reinitialiser-mot-de-passe.component';

describe('ReinitialiserMotDePasseComponent', () => {
  let component: ReinitialiserMotDePasseComponent;
  let fixture: ComponentFixture<ReinitialiserMotDePasseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReinitialiserMotDePasseComponent ],
      imports: [ToastrModule.forRoot(),HttpClientTestingModule,RouterTestingModule,FormsModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReinitialiserMotDePasseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
