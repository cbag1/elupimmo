import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiendetailComponent } from './biendetail.component';

describe('BiendetailComponent', () => {
  let component: BiendetailComponent;
  let fixture: ComponentFixture<BiendetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BiendetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BiendetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
