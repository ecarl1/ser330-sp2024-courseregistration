const Student = require('../src/student');
const Course = require('../src/course');
const CourseOffering = require('../src/course-offering');

describe('Student Class Additional Tests', () => {
  let student, courseMath, coursePhysics, offeringMath, offeringPhysics;

  beforeEach(() => {
    // Initialize the student and courses
    student = new Student('Doe', 'John', {name: 'Test University'}, new Date('2000-01-01'), 'jdoe');
    courseMath = new Course('Math', 'MTH101', 'Calculus', 4);
    coursePhysics = new Course('Physics', 'PHY101', 'General Physics', 3);

    // Create course offerings and register the student
    offeringMath = new CourseOffering(courseMath, '01', '2023', 'Fall');
    offeringPhysics = new CourseOffering(coursePhysics, '01', '2023', 'Fall');
    offeringMath.register_students([student]);
    offeringPhysics.register_students([student]);

    // Assign grades
    offeringMath.grades[student.username] = 'A';
    offeringPhysics.grades[student.username] = 'B+';
    student.transcript[offeringMath.toString()] = 'A';
    student.transcript[offeringPhysics.toString()] = 'B+';
  });

  test('GPA calculation based on course grades', () => {
    // Setup CourseOffering instances and assign grades as shown previously
    student.courseList.push(offeringMath, offeringPhysics);
    offeringMath.submit_grade(student, 'A');
    offeringPhysics.submit_grade(student, 'B+');
  
    // Now assert the GPA
    const expectedGPA = ((4.0 * courseMath.credits) + (3.33 * coursePhysics.credits)) / (courseMath.credits + coursePhysics.credits);
    expect(student.gpa).toBeCloseTo(expectedGPA);
  });




  test('toString method returns the correct string representation', () => {
    // Assuming student properties are set correctly in the Student constructor or elsewhere before this test
    const expectedString = 
      `\nStudent Name: ${student.firstName} ${student.lastName}\n` +
      `School: ${student.school.name}\n` +
      `DOB: ${student.dateOfBirth.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}\n` +
      `Username: ${student.username}\n` +
      `Email: ${student.email}\n` +
      `GPA: ${student.gpa.toFixed(2)}\n` +
      `Credits: ${student.credits}\n`;
  
    expect(student.toString()).toBe(expectedString);
  });
  
});
