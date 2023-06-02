import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenusCreateComponent } from './menus-create.component';

describe('MenusCreateComponent', () => {
  let component: MenusCreateComponent;
  let fixture: ComponentFixture<MenusCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenusCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenusCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
