import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtMainComponent } from './art-main.component';

describe('ArtMainComponent', () => {
  let component: ArtMainComponent;
  let fixture: ComponentFixture<ArtMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
