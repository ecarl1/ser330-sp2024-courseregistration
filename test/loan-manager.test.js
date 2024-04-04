const LoanManager = require('../src/examples/loan-manager');

describe('LoanManager Class', () => {
  let loanManager;

  beforeEach(() => {
    loanManager = new LoanManager();
  });

  test('should approve loan when income is high enough, regardless of other factors', () => {
    expect(loanManager.canGetLoan(35000, false, true, false)).toBe(true);
    expect(loanManager.canGetLoan(35000, true, false, true)).toBe(true);
  });

  test('should approve loan when income is low, no criminal record, and required docs are present', () => {
    expect(loanManager.canGetLoan(25000, false, true, false)).toBe(true);
  });

  test('should deny loan when income is low, has a criminal record, regardless of other factors', () => {
    expect(loanManager.canGetLoan(25000, true, true, false)).toBe(false);
    expect(loanManager.canGetLoan(25000, true, false, true)).toBe(false);
  });

  test('should deny loan when income is low, no criminal record, but required docs are missing', () => {
    expect(loanManager.canGetLoan(25000, false, false, false)).toBe(false);
  });

  test('should approve loan when income is low, no criminal record, no existing loan, and required docs are present', () => {
    expect(loanManager.canGetLoan(25000, false, true, false)).toBe(true);
  });

  // Add more tests as needed to cover all branches and scenarios
});
