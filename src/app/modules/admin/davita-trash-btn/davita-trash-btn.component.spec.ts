import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DavitaTrashBtnComponent } from './davita-trash-btn.component';

describe('DavitaTrashBtnComponent', () => {
  let component: DavitaTrashBtnComponent;
  let fixture: ComponentFixture<DavitaTrashBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DavitaTrashBtnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DavitaTrashBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
