import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { D3DensityComponent } from './d3-density.component';

describe('D3DensityComponent', () => {
  let component: D3DensityComponent;
  let fixture: ComponentFixture<D3DensityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ D3DensityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(D3DensityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
