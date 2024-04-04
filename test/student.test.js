const Student = require('../src/student');
const Course = require('../src/course');
const CourseOffering = require('../src/course-offering');

describe('Student Class Tests', () => {
  let student;
  let courseMath;
  let coursePhysics;
  let offeringMath;
  let offeringPhysics;

  beforeEach(() => {
    student = new Student('Doe', 'John', 'Test University', new Date('2000-01-01'), 'jdoe');

    courseMath = new Course('Math', 'MTH101', 'Calculus', 4);
    coursePhysics = new Course('Physics', 'PHY101', 'General Physics', 3);

    offeringMath = new CourseOffering(courseMath, '01', '2023', 'Fall');
    offeringPhysics = new CourseOffering(coursePhysics, '01', '2023', 'Fall');

    offeringMath.register_students([student]);
    offeringPhysics.register_students([student]);

    student.transcript[offeringMath.toString()] = 'A';
    student.transcript[offeringPhysics.toString()] = 'B+';

    offeringMath.grades[student.username] = 'A';
    offeringPhysics.grades[student.username] = 'B+';
  });

  test('Student properties are correctly assigned', () => {
    expect(student.lastName).toBe('Doe');
    expect(student.firstName).toBe('John');
    expect(student.school).toBe('Test University');
    expect(student.dateOfBirth).toEqual(new Date('2000-01-01'));
    expect(student.username).toBe('jdoe');
  });

  test('list_courses returns a sorted list of courses', () => {
    const courses = student.list_courses();
    expect(courses).toContain(offeringMath.toString());
    expect(courses).toContain(offeringPhysics.toString());
    expect(courses[0]).toBe(offeringMath.toString());
    expect(courses[1]).toBe(offeringPhysics.toString());
  });

  test('credits returns the total credits from enrolled courses', () => {
    expect(student.credits).toBe(courseMath.credits + coursePhysics.credits);
  });

  test('gpa returns the correct GPA based on grades', () => {
    const expectedGPA = ((4.0 * courseMath.credits) + (3.33 * coursePhysics.credits)) / (courseMath.credits + coursePhysics.credits);
    expect(student.gpa).toBeCloseTo(expectedGPA);
  });

  test('toString returns the correct string representation', () => {
    const expectedString = `\nStudent Name: John Doe\nSchool: Test University\nDOB: ${student.dateOfBirth.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}\nUsername: jdoe\nEmail: ${student.email}\nGPA: ${student.gpa.toFixed(2)}\nCredits: ${student.credits}\n`;
    expect(student.toString()).toBe(expectedString);
  });
});
