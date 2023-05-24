import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendPassRecoverComponent } from './send-pass-recover.component';

describe('SendPassRecoverComponent', () => {
  let component: SendPassRecoverComponent;
  let fixture: ComponentFixture<SendPassRecoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendPassRecoverComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendPassRecoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
