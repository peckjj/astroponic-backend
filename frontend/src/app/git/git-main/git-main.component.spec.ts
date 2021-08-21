import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GitMainComponent } from './git-main.component';

describe('GitMainComponent', () => {
  let component: GitMainComponent;
  let fixture: ComponentFixture<GitMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GitMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GitMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
