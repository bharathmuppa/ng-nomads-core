import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ButtonWithIconAndTextComponent} from './button-with-icon-and-text.component';

describe('ButtonWithIconAndTextComponent', () => {
  let component: ButtonWithIconAndTextComponent;
  let fixture: ComponentFixture<ButtonWithIconAndTextComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ButtonWithIconAndTextComponent]
    });
    fixture = TestBed.createComponent(ButtonWithIconAndTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
