import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';

import { InfosJeuxAdminComponent } from './infos-jeux-admin.component';

describe('InfosJeuxAdminComponent', () => {
  let component: InfosJeuxAdminComponent;
  let fixture: ComponentFixture<InfosJeuxAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfosJeuxAdminComponent ],
      imports: [ToastrModule.forRoot(),HttpClientTestingModule,RouterTestingModule,FormsModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfosJeuxAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
