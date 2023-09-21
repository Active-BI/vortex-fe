import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RotasAninhadasComponent } from './rotas-aninhadas.component';

describe('RotasAninhadasComponent', () => {
  let component: RotasAninhadasComponent;
  let fixture: ComponentFixture<RotasAninhadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RotasAninhadasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RotasAninhadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
