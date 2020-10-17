import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipamentHeaderComponent } from './equipament-header.component';

describe('EquipamentHeaderComponent', () => {
  let component: EquipamentHeaderComponent;
  let fixture: ComponentFixture<EquipamentHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipamentHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipamentHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
