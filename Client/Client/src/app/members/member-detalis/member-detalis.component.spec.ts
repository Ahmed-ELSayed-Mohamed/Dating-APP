import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberDetalisComponent } from './member-detalis.component';

describe('MemberDetalisComponent', () => {
  let component: MemberDetalisComponent;
  let fixture: ComponentFixture<MemberDetalisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberDetalisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberDetalisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
