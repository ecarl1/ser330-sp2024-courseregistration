const Instructor = require('../src/instructor');
const CourseOffering = require('../src/course-offering');
const Course = require('../src/course');

describe('Instructor Class Tests', () => {
  let instructor;
  let course;
  let courseOffering1;
  let courseOffering2;

  beforeEach(() => {
    instructor = new Instructor('John', 'Doe', 'Physics', 10);
    course = new Course('Physics', 'PHY101', 'Intro to Physics', 4);
    courseOffering1 = new CourseOffering(course, '01', '2024', 'Fall');
    courseOffering2 = new CourseOffering(course, '02', '2023', 'Spring');
  });

  test('Instructor properties are correctly assigned', () => {
    expect(instructor.firstName).toBe('John');
    expect(instructor.lastName).toBe('Doe');
    expect(instructor.department).toBe('Physics');
    expect(instructor.yearsOfExperience).toBe(10);
    expect(instructor.courseList).toEqual([]);
  });

  test('list_courses returns correct courses for the instructor', () => {
    instructor.courseList.push(courseOffering1, courseOffering2);

    // Test filtering by year
    expect(instructor.list_courses('2024')).toContain(courseOffering1.toString());

    // Test filtering by quarter
    expect(instructor.list_courses(null, 'Spring')).toContain(courseOffering2.toString());

    // Test filtering by both year and quarter
    expect(instructor.list_courses('2024', 'Fall')).toContain(courseOffering1.toString());

    // Test with no filters
    expect(instructor.list_courses()).toContain(courseOffering1.toString());
    expect(instructor.list_courses()).toContain(courseOffering2.toString());
  });

  test('toString returns the correct string representation', () => {
    const expectedString = `\nInstructor Name: John Doe\nSchool: undefined\nDOB: undefined\nUsername: undefined\n`;
    expect(instructor.toString()).toBe(expectedString);
  });
});
