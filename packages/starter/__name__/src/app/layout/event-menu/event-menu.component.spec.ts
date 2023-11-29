import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EventMenuComponent} from './event-menu.component';

describe('RightMenuComponent', () => {
  let component: EventMenuComponent;
  let fixture: ComponentFixture<EventMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EventMenuComponent]
    });
    fixture = TestBed.createComponent(EventMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
