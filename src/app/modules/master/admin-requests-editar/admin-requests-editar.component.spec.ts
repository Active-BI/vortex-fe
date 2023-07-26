import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRequestsEditarComponent } from './admin-requests-editar.component';

describe('AdminRequestsEditarComponent', () => {
  let component: AdminRequestsEditarComponent;
  let fixture: ComponentFixture<AdminRequestsEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRequestsEditarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRequestsEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
