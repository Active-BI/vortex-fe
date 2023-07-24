import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestaoTenantCriarComponent } from './gestao-tenant-criar.component';

describe('GestaoTenantCriarComponent', () => {
  let component: GestaoTenantCriarComponent;
  let fixture: ComponentFixture<GestaoTenantCriarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestaoTenantCriarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestaoTenantCriarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
