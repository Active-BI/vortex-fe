import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarRotaComponent } from './criar-rota.component';

describe('CriarRotaComponent', () => {
  let component: CriarRotaComponent;
  let fixture: ComponentFixture<CriarRotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriarRotaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriarRotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
