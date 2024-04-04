const Person = require('./person.js')

class Instructor extends Person {
  constructor(firstName, lastName, department, yearsOfExperience) {
    super(firstName, lastName);
    this.department = department;
    this.yearsOfExperience = yearsOfExperience;
    this.courseList = []; // Initialize courseList as an array
  }

  list_courses (year = null, quarter = null) {
    if (year !== null && quarter !== null) { // filter by year and quarter
      const filtered = this.course_list.filter(course => course.year === year && course.quarter === quarter) // filters
      const sorted = filtered.sort((a, b) => new Date(b.year, b.quarter) - new Date(a.year, a.quarter)) // sorts
      return sorted.map(course => course.toString())
    } else if (year !== null) { // only year arg given
      const filtered = this.course_list.filter(course => course.year === year) // filters
      const sorted = filtered.sort((a, b) => new Date(b.year, b.quarter) - new Date(a.year, a.quarter)) // sorts
      return sorted.map(course => course.toString())
    } else if (quarter !== null) { // only quarter arg given
      const filtered = this.course_list.filter(course => course.quarter === quarter) // filters
      const sorted = filtered.sort((a, b) => new Date(b.year, b.quarter) - new Date(a.year, a.quarter)) // sorts
      return sorted.map(course => course.toString())
    } else { // no filters given, default to None
      const sorted = this.course_list.sort((a, b) => new Date(b.year, b.quarter) - new Date(a.year, a.quarter)) // sorts
      return sorted.map(course => course.toString())
    }
  }

  toString() {
    // Adjust to handle potentially undefined this.school
    return `\nInstructor Name: ${this.firstName} ${this.lastName}\nSchool: ${this.school ? this.school.name : 'N/A'}\nDOB: ${this.dateOfBirth ? this.dateOfBirth.toLocaleDateString('en-US') : 'N/A'}\nUsername: ${this.userName || 'N/A'}\n`;
  }
}

module.exports = Instructor
