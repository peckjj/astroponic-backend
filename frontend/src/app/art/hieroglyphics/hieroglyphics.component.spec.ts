import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HieroglyphicsComponent } from './hieroglyphics.component';

describe('HieroglyphicsComponent', () => {
  let component: HieroglyphicsComponent;
  let fixture: ComponentFixture<HieroglyphicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HieroglyphicsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HieroglyphicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
