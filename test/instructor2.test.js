const Institution = require('../src/institution');
const Instructor = require('../src/instructor');
const Course = require('../src/course');
const CourseOffering = require('../src/course-offering');
const Student = require('../src/student');
describe('Instructor Class Tests - Additional', () => {
    let instructor, course1, course2;
  
    beforeEach(() => {
      instructor = new Instructor('John', 'Doe', 'Physics', 10);
      course1 = new Course('Physics', 'PHY101', 'Intro to Physics', 4);
      course2 = new Course('Chemistry', 'CHEM101', 'Intro to Chemistry', 3);
  
      // Mock course offerings for the instructor
      const offering1 = new CourseOffering(course1, '01', '2024', 'Fall');
      const offering2 = new CourseOffering(course2, '01', '2023', 'Spring');
      instructor.courseList.push(offering1, offering2);
    });
  
    test('list_courses filters by year', () => {
      const courses2024 = instructor.list_courses('2024');
      expect(courses2024.length).toBe(1);
      expect(courses2024[0]).toContain('PHY101');
    });
  
    test('list_courses filters by quarter', () => {
      const coursesSpring = instructor.list_courses(null, 'Spring');
      expect(coursesSpring.length).toBe(1);
      expect(coursesSpring[0]).toContain('CHEM101');
    });
  
    test('list_courses filters by year and quarter', () => {
      const courses = instructor.list_courses('2024', 'Fall');
      expect(courses.length).toBe(1);
      expect(courses[0]).toContain('PHY101');
    });
  
    test('list_courses with no filters', () => {
      const courses = instructor.list_courses();
      expect(courses.length).toBe(2);
    });
      
  });
  