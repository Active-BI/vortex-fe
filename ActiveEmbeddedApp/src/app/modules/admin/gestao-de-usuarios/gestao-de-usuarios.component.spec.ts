import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestaoDeUsuariosComponent } from './gestao-de-usuarios.component';

describe('GestaoDeUsuariosComponent', () => {
  let component: GestaoDeUsuariosComponent;
  let fixture: ComponentFixture<GestaoDeUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestaoDeUsuariosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestaoDeUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
