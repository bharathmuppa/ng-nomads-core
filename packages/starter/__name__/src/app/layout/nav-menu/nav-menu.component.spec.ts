import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NavMenuComponent} from './nav-menu.component';

describe('LeftMenuComponent', () => {
  let component: NavMenuComponent;
  let fixture: ComponentFixture<NavMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NavMenuComponent]
    });
    fixture = TestBed.createComponent(NavMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
