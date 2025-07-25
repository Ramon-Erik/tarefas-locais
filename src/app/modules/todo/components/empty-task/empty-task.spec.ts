import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyTask } from './empty-task';

describe('EmptyTask', () => {
  let component: EmptyTask;
  let fixture: ComponentFixture<EmptyTask>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmptyTask]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmptyTask);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
