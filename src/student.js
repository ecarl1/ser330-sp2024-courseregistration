const Person = require('./person.js') // Assuming person.js contains the Person class

class Student extends Person {
  constructor (lastName, firstName, school, dateOfBirth, username) {
    super(lastName, firstName, school, dateOfBirth, username, 'student')
    this.courseList = [] // list of offering objects
    this.transcript = {} // course:grade
  }

  list_courses () {
    const ordered = Object.keys(this.transcript)
      .sort((a, b) => {
        const yearComparison = b.year - a.year
        if (yearComparison !== 0) return yearComparison
        return b.quarter - a.quarter
      })
    return ordered
  }

  get credits () {
    let total = 0
    for (const x of this.courseList) {
      total += x.course.credits
    }
    return total
  }

  get gpa() {
    let earned = 0;
    let available = 0;
  
    const gradeScale = {
      'A+': 4.0,
      'A': 4.0,
      'A-': 3.67,
      'B+': 3.33,
      'B': 3.0,
      'B-': 2.67,
      'C+': 2.33,
      'C': 2.0,
      'C-': 1.67,
      'D+': 1.33,
      'D': 1.0,
      'D-': 0.67,
      'F': 0,
    };
  
    for (const offering of this.courseList) {
      const grade = offering.get_grade(this);
      if (grade) {
        earned += (gradeScale[grade] * offering.course.credits);
        available += offering.course.credits;
      }
    }
  
    return available === 0 ? 0 : earned / available;
  }
  

  toString() {
    return (
      `\nStudent Name: ${this.firstName} ${this.lastName}\n` +
      `School: ${this.school.name}\n` +
      `DOB: ${this.dateOfBirth.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}\n` +
      `Username: ${this.username}\n` + // Make sure username is correctly set in the constructor
      `Email: ${this.email}\n` + // Ensure email is set and accessible
      `GPA: ${this.gpa.toFixed(2)}\n` +
      `Credits: ${this.credits}\n`
    );
  }
  
}

module.exports = Student
