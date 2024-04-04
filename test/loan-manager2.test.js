const LoanManager = require('../src/examples/loan-manager');

describe('LoanManager Class Tests', () => {
  let loanManager;

  beforeEach(() => {
    loanManager = new LoanManager();
  });

  test('should grant loan if income >= 30000 and has a loan', () => {
    expect(loanManager.canGetLoan(30000, false, false, true)).toBe(true);
  });

  test('should grant loan if income >= 30000, no loan but has required docs', () => {
    expect(loanManager.canGetLoan(30000, false, true, false)).toBe(true);
  });

  test('should not grant loan if income >= 30000, no loan, and no required docs', () => {
    expect(loanManager.canGetLoan(30000, false, false, false)).toBe(false);
  });

  test('should not grant loan if income < 30000 and has a criminal record', () => {
    expect(loanManager.canGetLoan(25000, true, true, false)).toBe(false);
  });

  test('should grant loan if income < 30000, no criminal record but has required docs', () => {
    expect(loanManager.canGetLoan(25000, false, true, false)).toBe(true);
  });

  test('should not grant loan if income < 30000, no criminal record, and no required docs', () => {
    expect(loanManager.canGetLoan(25000, false, false, false)).toBe(false);
  });
});
