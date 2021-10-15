import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsciiTableComponent } from './ascii-table.component';

describe('AsciiTableComponent', () => {
  let component: AsciiTableComponent;
  let fixture: ComponentFixture<AsciiTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsciiTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsciiTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
