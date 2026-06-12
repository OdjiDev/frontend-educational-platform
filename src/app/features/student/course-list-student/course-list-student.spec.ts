import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseListStudent } from './course-list-student';

describe('CourseListStudent', () => {
  let component: CourseListStudent;
  let fixture: ComponentFixture<CourseListStudent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseListStudent],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseListStudent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
