import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { InfosGameComponent } from './infos-game.component';

describe('InfosGameComponent', () => {
  let component: InfosGameComponent;
  let fixture: ComponentFixture<InfosGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfosGameComponent ],
      imports: [HttpClientTestingModule,RouterTestingModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfosGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
