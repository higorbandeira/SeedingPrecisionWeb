import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusAtualComponent } from './status-atual.component';

describe('StatusAtualComponent', () => {
  let component: StatusAtualComponent;
  let fixture: ComponentFixture<StatusAtualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusAtualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusAtualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
