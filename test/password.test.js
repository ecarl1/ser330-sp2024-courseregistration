// const PasswordManager = require('../src/examples/password-verification2.js')
// Import
const PasswordManager = require('../src/examples/password-verification3.js')


describe('Password Verification Tests', () => {

  // Given, WHen, Then / Returns
  test('VerifyPassword_WhenCredentialsAreValid_ReturnsTrue', () => {
    // Arrange
    const passwordManager = new PasswordManager()
    const userName = 'TestUser'
    const password = 'Password'

    // Act
    const result = passwordManager.verifyPassword(userName, password)

    // Assert
    expect(result).toBe(true)
  })
})
