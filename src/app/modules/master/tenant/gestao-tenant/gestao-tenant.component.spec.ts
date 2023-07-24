import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestaoTenantComponent } from './gestao-tenant.component';

describe('GestaoTenantComponent', () => {
  let component: GestaoTenantComponent;
  let fixture: ComponentFixture<GestaoTenantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestaoTenantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestaoTenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
