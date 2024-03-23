const Course = require('../src/course.js')
const CourseOffering = require('../src/course-offering.js')

describe('Course Offering Tests', () => {
  test('CreateCourseOffering_WhenAllConditionsAreMet_ReturnsObject', () => {
    // Triple A Pattern

    // Arrange
    const softwareQualityAssuranceCourse = new Course('Software Engineering', 'SER330', 'Software Quality Assurance', 3)

    // Act
    const softwareQualityAssuranceFallCourseOffering = new CourseOffering(softwareQualityAssuranceCourse, '01', '2024', '1')

    // Assert
    expect(softwareQualityAssuranceFallCourseOffering).not.toBeNull()
  })
})
