const Institution = require('../src/institution');
const Instructor = require('../src/instructor');
const Course = require('../src/course');
const CourseOffering = require('../src/course-offering');
const Student = require('../src/student');

describe('Institution Class Tests', () => {
    let institution, instructor, course, courseOffering, student;

    beforeEach(() => {
        institution = new Institution('Test University', 'test.edu');
        instructor = new Instructor('Doe', 'John', 'Physics', 10);
        course = new Course('Physics', 'PHY101', 'Intro to Physics', 4);
        courseOffering = new CourseOffering(course, '01', '2024', 'Fall');
        student = new Student('Smith', 'Jane', institution, '1990-01-01', 'jsmith');

        // Ensuring course is added to the catalog and the offering to the schedule
        institution.add_course(course);
        institution.courseSchedule[course.name] = [courseOffering];
    });

    test('assign_instructor should assign an instructor to a course offering', () => {
        institution.assign_instructor(instructor, course.name, course.department, course.number, courseOffering.sectionNumber, courseOffering.year, courseOffering.quarter);
        expect(courseOffering.instructor).toBe(instructor);
    });

    test('list_course_catalog should output the course catalog', () => {
        console.log = jest.fn();
        institution.list_course_catalog();
        expect(console.log.mock.calls.some(call => JSON.stringify(call[0]).includes('Physics'))).toBeTruthy();
    });

    test('list_course_schedule should output the course schedule', () => {
        console.log = jest.fn();
        institution.list_course_schedule('2024', 'Fall');
        expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Intro to Physics'));
    });

    test('list_registered_students should output registered students', () => {
        // Registering the student to ensure the course offering has a registered student
        institution.enroll_student(student);
        courseOffering.register_students([student]);
        
        console.log = jest.fn();
        institution.list_registered_students(course.name, course.department, course.number, courseOffering.sectionNumber, courseOffering.year, courseOffering.quarter);
        expect(console.log).toHaveBeenCalledWith(expect.stringContaining(`${student.lastName}, ${student.firstName}`));
      });
      
});
