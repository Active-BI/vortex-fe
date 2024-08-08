import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebpageFormComponentComponent } from './webpage-form-component.component';

describe('WebpageFormComponentComponent', () => {
  let component: WebpageFormComponentComponent;
  let fixture: ComponentFixture<WebpageFormComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebpageFormComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebpageFormComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
