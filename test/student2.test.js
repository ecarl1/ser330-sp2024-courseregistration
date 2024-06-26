const Student = require('../src/student');
const Course = require('../src/course');
const CourseOffering = require('../src/course-offering');

describe('Student Class Tests', () => {
    let student;
    let course1, course2, courseOffering1, courseOffering2;

    beforeEach(() => {
        
        const testUniversity = { name: 'Test University' };
        student = new Student('Doe', 'John', 'Test University', '1990-01-01', 'jdoe');

        course1 = new Course('Math', 'MTH101', 'Algebra', 3);
        course2 = new Course('Science', 'SCI101', 'Biology', 4);

        courseOffering1 = new CourseOffering(course1, '01', '2024', 'Fall');
        courseOffering2 = new CourseOffering(course2, '02', '2023', 'Spring');

        courseOffering1.grades['jdoe'] = 'A';
        courseOffering2.grades['jdoe'] = 'B';

        student.courseList.push(courseOffering1);
        student.courseList.push(courseOffering2);

        // Simulate grades for sorting logic in list_courses
        student.transcript = {
            'MTH101': { year: 2024, quarter: 'Fall', grade: 'A' },
            'SCI101': { year: 2023, quarter: 'Spring', grade: 'B' }
        };
    });

    test('list_courses should return courses sorted by year and quarter', () => {
        const courseList = student.list_courses();
        expect(courseList).toEqual(['MTH101', 'SCI101']); // Expect courses to be sorted by year and then quarter
    });

    test('credits should calculate total credits from courses', () => {
        expect(student.credits).toBe(7); // 3 credits from MTH101 and 4 credits from SCI101
    });


    
});
