import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmininstructorsComponent } from './admininstructors.component';

describe('AdmininstructorsComponent', () => {
  let component: AdmininstructorsComponent;
  let fixture: ComponentFixture<AdmininstructorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdmininstructorsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdmininstructorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
