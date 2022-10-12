import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { GoogleLoginProvider, SocialLoginModule, SocialAuthServiceConfig, SocialUser,FacebookLoginProvider} from 'angularx-social-login';
import { ToastrModule } from 'ngx-toastr';
import { NotifierService, NotifierModule } from 'angular-notifier';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ToastrModule.forRoot(),HttpClientTestingModule,RouterTestingModule,FormsModule,NotifierModule],
      providers: [GoogleLoginProvider,{provide: 'GoogleLoginProvider.PROVIDER_ID', useValue: '778933620479-3ens5a93he1u5pv2s96jnqaoqv3f22vd.apps.googleusercontent.com'},FacebookLoginProvider,{provide: 'FacebookLoginProvider.PROVIDER_ID', useValue: '344024330422446'}],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
