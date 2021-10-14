import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MManagementComponent } from './m-management.component';

describe('MManagementComponent', () => {
  let component: MManagementComponent;
  let fixture: ComponentFixture<MManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
