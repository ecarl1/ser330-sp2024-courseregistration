const Institution = require('../src/institution');
const Student = require('../src/student');
const Instructor = require('../src/instructor');
const Course = require('../src/course');
const CourseOffering = require('../src/course-offering');


describe('Institution Class Tests', () => {
    let institution;
    let student;
    let instructor;
    let course;
    let courseOffering;

    beforeEach(() => {
        institution = new Institution('Test University', 'test.edu');
        student = new Student('John', 'Doe', institution, '1/1/1990', 'jdoe');
        instructor = new Instructor('Jane', 'Smith', institution, '1/2/1990', 'jsmith');
        course = new Course('Math', 'MTH101', 'Algebra', 3);
        institution.add_course(course);
        courseOffering = new CourseOffering(course, '01', '2024', 'Fall');
        institution.add_course_offering(courseOffering);
    });

    

    
    
    


    test('Institution initialization', () => {
        expect(institution.name).toBe('Test University');
        expect(institution.domain).toBe('test.edu');
    });

    test('Enroll student', () => {
        institution.enroll_student(student);
        expect(institution.studentList[student.userName]).toBeDefined();
    });

    test('Hire instructor', () => {
        institution.hire_instructor(instructor);
        expect(institution.facultyList[instructor.userName]).toBeDefined();
    });

    test('Add course', () => {
        institution.add_course(course);
        expect(institution.courseCatalog[course.name]).toBeDefined();
    });

    test('Add course offering', () => {
        institution.add_course_offering(courseOffering);
        expect(institution.courseSchedule[course.name]).toBeDefined();
        expect(institution.courseSchedule[course.name]).toContain(courseOffering);
    });

    /*
    test('Register student for course', () => {
        institution.enroll_student(student);
        institution.add_course(course);
        institution.add_course_offering(courseOffering);
        institution.register_student_for_course(student, course.name, course.department, course.number, '01', '2024', 'Fall');
        const isStudentRegistered = courseOffering.registeredStudents.some(s => s.userName === student.userName);
        expect(isStudentRegistered).toBeTruthy();
    });
    */
    


    test('listStudents should handle no students', () => {
        expect(() => institution.listStudents()).not.toThrow();
    });

    test('enroll_student should throw error for non-Student objects', () => {
        expect(() => institution.enroll_student({})).toThrow(TypeError);
    });

    test('enroll_student should not add a student twice', () => {
        institution.enroll_student(student);
        institution.enroll_student(student);
        expect(Object.keys(institution.studentList).length).toBe(1);
    });

    /*
    test('register_student_for_course should handle unenrolled student', () => {
        institution.add_course(course);
        institution.add_course_offering(courseOffering);
        const action = () => institution.register_student_for_course(new Student('Jane', 'Doe', institution, '2/2/1990', 'jdoe2'), course.name, course.department, course.number, '01', '2024', 'Fall');
        expect(action).toThrow('Student is not enrolled');
    });
    */

    test('list_instructors should handle no instructors', () => {
        expect(() => institution.list_instructors()).not.toThrow();
    });

    test('hire_instructor should throw error for non-Instructor objects', () => {
        expect(() => institution.hire_instructor({})).toThrow(TypeError);
    });

    test('add_course should not add a course twice', () => {
        institution.add_course(course);
        institution.add_course(course);
        expect(Object.keys(institution.courseCatalog).length).toBe(1);
    });

    /*
    test('add_course_offering should not add an offering for a non-existent course', () => {
        const newCourseOffering = new CourseOffering(new Course('Biology', 'BIO101', 'General Biology', 4), '02', '2024', 'Spring');
        const action = () => institution.add_course_offering(newCourseOffering);
        expect(action).toThrow('Course is not in the catalog');
    });
    */

    test('add_course should correctly add a course to the catalog', () => {
        const mathCourse = new Course('Math', 'MTH101', 'Algebra', 3);
        institution.add_course(mathCourse);
        // Assuming 'Algebra' is the course name and used as the key in the courseCatalog
        expect(institution.courseCatalog['Algebra']).toBeDefined();
        expect(institution.courseCatalog['Algebra'].name).toBe('Algebra');
      });
      
      
      test('add_course_offering should not add an offering for a non-existent course', () => {
        const courseOffering = new CourseOffering(new Course('Science', 'SCI101', 'Biology', 3), '01', '2024', 'Fall');
        const response = institution.add_course_offering(courseOffering);
        expect(response).toBe('Please create a course before creating course offering');
        expect(institution.courseSchedule['Science']).toBeUndefined();
      });
      
      // Additional tests for list_course_catalog, list_course_schedule, and list_registered_students would follow a similar pattern
      

   

    test('remove_student should successfully remove an enrolled student', () => {
        institution.enroll_student(student);
        expect(institution.studentList[student.userName]).toBeDefined();
        institution.remove_student(student);
        expect(institution.studentList[student.userName]).toBeUndefined();
      });
      
    /*
      test('assign_instructor should assign an instructor to a course offering', () => {
        const course = new Course('Math', 'MTH101', 'Algebra', 3);
        institution.add_course(course);
      
        // Ensure the course offering is added
        const courseOffering = new CourseOffering(course, '01', '2024', 'Fall');
        institution.add_course_offering(courseOffering);
      
        const instructor = new Instructor('Doe', 'John', institution, 'Ph.D.', 'jdoe');
        institution.hire_instructor(instructor);
      
        // Ensure courseSchedule is properly initialized and the offering exists
        expect(institution.courseSchedule['Algebra']).toBeDefined();
        expect(institution.courseSchedule['Algebra'].length).toBeGreaterThan(0);
      
        // Now assign the instructor
        institution.assign_instructor(instructor, 'Algebra', 'Math', 'MTH101', '01', '2024', 'Fall');
      
        // Validate the instructor is assigned
        const assignedOffering = institution.courseSchedule['Algebra'].find(o => 
          o.sectionNumber === '01' && o.year === '2024' && o.quarter === 'Fall');
        expect(assignedOffering).toBeDefined();
        expect(assignedOffering.instructor).toBe(instructor);
      });
      */
      
    

    // Additional tests should be added to cover various branches and methods, 
    // such as listing students, instructors, and course offerings, 
    // as well as error handling and edge cases.
});
