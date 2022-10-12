import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailingComponent } from './emailing.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';

describe('EmailingComponent', () => {
  let component: EmailingComponent;
  let fixture: ComponentFixture<EmailingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailingComponent ],
      imports: [ToastrModule.forRoot(),HttpClientTestingModule,RouterTestingModule,FormsModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
