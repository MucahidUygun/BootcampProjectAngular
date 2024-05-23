import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationStateComponent } from './application-state.component';

describe('ApplicationStateComponent', () => {
  let component: ApplicationStateComponent;
  let fixture: ComponentFixture<ApplicationStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationStateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApplicationStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
