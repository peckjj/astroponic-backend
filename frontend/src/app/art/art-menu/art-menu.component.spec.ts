import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtMenuComponent } from './art-menu.component';

describe('ArtMenuComponent', () => {
  let component: ArtMenuComponent;
  let fixture: ComponentFixture<ArtMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
