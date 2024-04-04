const Institution = require('../src/institution');
const Instructor = require('../src/instructor');
const Course = require('../src/course');
const CourseOffering = require('../src/course-offering');
const Student = require('../src/student');

describe('Instructor Class Tests', () => {
    let instructor;
  
    beforeEach(() => {
      instructor = new Instructor('John', 'Doe', 'Physics', 10);
    });
  
    test('Instructor properties are correctly assigned', () => {
      expect(instructor.firstName).toBe('John');
      expect(instructor.lastName).toBe('Doe');
      expect(instructor.department).toBe('Physics');
      expect(instructor.yearsOfExperience).toBe(10);
    });
  
    test('list_courses returns the correct courses', () => {
      const course1 = new Course('Physics', 'PHY101', 'Intro to Physics', 4);
      const courseOffering1 = new CourseOffering(course1, '01', '2024', 'Fall');
      instructor.courseList.push(courseOffering1);
  
      const course2 = new Course('Math', 'MTH101', 'Calculus', 3);
      const courseOffering2 = new CourseOffering(course2, '02', '2023', 'Spring');
      instructor.courseList.push(courseOffering2);
  
      const courses = instructor.list_courses();
      expect(courses).toContain(courseOffering1.toString());
      expect(courses).toContain(courseOffering2.toString());
    });
  
    test('toString returns the correct string representation', () => {
      const expectedString = `Instructor Name: John Doe\nDepartment: Physics\nYears of Experience: 10`;
      expect(instructor.toString()).toBe(expectedString);
    });
  });
  