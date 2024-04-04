const Institution = require('../src/institution.js')
const Course = require('../src/course.js')
const CourseOffering = require('../src/course-offering.js')
const Student = require('../src/student.js')
const Instructor = require('../src/instructor.js')

describe('Test Group For Course Offering', () => {

    let testInstitution = null
    let courseTest = null
    let courseOffering = null
    let seniorStudent = null
    let instructor = null

    beforeEach(() => {
        testInstitution = new Institution('Quinnipiac University', 'qu.edu')
        courseTest = new Course('Software Engineering', 'SER330', 'Software Quality Assurance', 3)
        courseOffering = new CourseOffering(courseTest, '12', '2024', '1')
        seniorStudent = new Student('Ryan', 'Dahl', testInstitution, '1/1/2024', 'rdahl')
        instructor = new Instructor('John', 'Doe', testInstitution, '1/1/1970', 'jdoe')
    })

    test('CreatesCourseOffering_WhenAllConditionsMet_ReturnsObject', () => {
        expect(courseOffering).not.toBeNull()
    })

    test('RegisterStudentToCourse_WhenAllConditionsMet_CompletesSuccessfully', () => {
        const students = [seniorStudent]
        courseOffering.register_students(students)
        expect(courseOffering.get_students()).toContain(seniorStudent)
    })

    test('VerifyStudentIsAddedToCourseList_WhenRegistered', () => {
        const students = [seniorStudent]
        courseOffering.register_students(students)
        expect(seniorStudent.courseList).toContain(courseOffering)
    })

    test('RegisterStudentToCourse_WhenStudentsIsNull_ThrowsError', () => {
        expect(() => {
            courseOffering.register_students(null)
        }).toThrow()
    })

    test('SubmitGradeForStudent_WhenValidGrade_CompletesSuccessfully', () => {
        const students = [seniorStudent]
        courseOffering.register_students(students)
        courseOffering.submit_grade(seniorStudent, 'A')
        expect(courseOffering.get_grade(seniorStudent)).toBe('A')
    })

    test('SubmitGradeForStudent_WhenInvalidGrade_ReturnsError', () => {
        const students = [seniorStudent];
        courseOffering.register_students(students);
        expect(() => courseOffering.submit_grade(seniorStudent, 'Z')).toThrow('Invalid grade or student not registered');
    });

    
    

    test('AssignInstructorToCourse_WhenInstructorIsValid_AssignmentIsSuccessful', () => {
        courseOffering.instructor = instructor
        expect(courseOffering.instructor).toBe(instructor)
    })

    test('InstructorDetailsAreCorrect_WhenAssignedToCourse', () => {
        courseOffering.instructor = instructor
        const courseDescription = courseOffering.toString()
        expect(courseDescription).toContain(instructor.firstName)
        expect(courseDescription).toContain(instructor.lastName)
    })
})
