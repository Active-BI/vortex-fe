import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestaoTenantEditComponent } from './gestao-tenant-edit.component';

describe('GestaoTenantEditComponent', () => {
  let component: GestaoTenantEditComponent;
  let fixture: ComponentFixture<GestaoTenantEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestaoTenantEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestaoTenantEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
