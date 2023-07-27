import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRequestsCriarComponent } from './admin-requests-criar.component';

describe('AdminRequestsCriarComponent', () => {
  let component: AdminRequestsCriarComponent;
  let fixture: ComponentFixture<AdminRequestsCriarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRequestsCriarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRequestsCriarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
