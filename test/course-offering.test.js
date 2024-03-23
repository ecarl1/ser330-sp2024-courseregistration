const CourseOffering = require('../src/course-offering.js')
const Course = require('../src/course.js')
const Institution = require('../src/institution.js')
const Student = require('../src/student.js')

describe('Course Offering Tests', () => {
  const course = new Course()

  beforeEach(() => {
    console.log('Start of New Test Case')
    jest.clearAllMocks()

    // Successfully mocked return
    jest.spyOn(course, 'toString').mockReturnValue('test')
  })

  test('Verify Mock', () => {
    // Given
    console.log(course.toString())

    // Given
    const mock = jest.fn()

    // When
    const result = mock('foo')

    // Then
    expect(result).toBeUndefined()
    expect(mock).toHaveBeenCalled()
    expect(mock).toHaveBeenCalledTimes(1)
    expect(mock).toHaveBeenCalledWith('foo')
  })

  // Given, When Then Approach
  test('RegistersStudentIntoCourseOffering_WhenAllConditionsAreMet_CompletesSuccessfully', () => {
    // Given
    console.log(course.toString())
    const testInstitution = new Institution('Quinnipiac University', 'qu.edu')

    const courseTest = new Course('Software Engineering', 'SER330', 'Software Quality Assurance', 3)
    const courseOffering = new CourseOffering(courseTest, '12', '2024', '1')
    const seniorStudent = new Student('Ryan', 'Dahl', testInstitution, '1/1/2024', 'rdahl')
    const students = new Array(seniorStudent)

    // Create functions to spy on the affected operations
    const registerStudentsSpy = jest.spyOn(courseOffering, 'register_students')
    const registeredStudentsSpy = jest.spyOn(courseOffering.registeredStudents, 'push')
    const courseListSpy = jest.spyOn(seniorStudent.courseList, 'push')

    // When
    // Execute the method that will perform the test
    courseOffering.register_students(students)

    // Then
    expect(registerStudentsSpy).toHaveBeenCalled()
    expect(registeredStudentsSpy).toHaveBeenCalledTimes(1)
    expect(courseListSpy).toHaveBeenCalledTimes(1)
  })
})
