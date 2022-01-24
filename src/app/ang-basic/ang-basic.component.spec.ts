import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngBasicComponent } from './ang-basic.component';

describe('AngBasicComponent', () => {
  let component: AngBasicComponent;
  let fixture: ComponentFixture<AngBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AngBasicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AngBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
