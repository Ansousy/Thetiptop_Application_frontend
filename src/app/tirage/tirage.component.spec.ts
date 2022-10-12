import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';

import { TirageComponent } from './tirage.component';

describe('TirageComponent', () => {
  let component: TirageComponent;
  let fixture: ComponentFixture<TirageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TirageComponent ],
      imports: [HttpClientTestingModule,ToastrModule.forRoot()], 
      providers: [NgbActiveModal]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TirageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
