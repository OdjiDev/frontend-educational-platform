import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCoursesComponentComponent } from './student-courses.component.component';

describe('StudentCoursesComponentComponent', () => {
  let component: StudentCoursesComponentComponent;
  let fixture: ComponentFixture<StudentCoursesComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentCoursesComponentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentCoursesComponentComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
