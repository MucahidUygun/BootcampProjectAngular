import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BootcampImageComponent } from './bootcampimage.component.';

describe('BootcampimageComponent', () => {
  let component: BootcampImageComponent;
  let fixture: ComponentFixture<BootcampImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BootcampImageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BootcampImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
