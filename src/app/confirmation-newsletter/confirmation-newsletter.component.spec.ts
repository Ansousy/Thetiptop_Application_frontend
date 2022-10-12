import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastrModule } from 'ngx-toastr';

import { ConfirmationNewsletterComponent } from './confirmation-newsletter.component';

describe('ConfirmationNewsletterComponent', () => {
  let component: ConfirmationNewsletterComponent;
  let fixture: ComponentFixture<ConfirmationNewsletterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationNewsletterComponent ],
      imports: [HttpClientTestingModule,ToastrModule.forRoot()], 
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationNewsletterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
