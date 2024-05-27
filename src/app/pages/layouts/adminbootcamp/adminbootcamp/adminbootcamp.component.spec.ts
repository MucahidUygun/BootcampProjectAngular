import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminbootcampComponent } from './adminbootcamp.component';

describe('AdminbootcampComponent', () => {
  let component: AdminbootcampComponent;
  let fixture: ComponentFixture<AdminbootcampComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminbootcampComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminbootcampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
