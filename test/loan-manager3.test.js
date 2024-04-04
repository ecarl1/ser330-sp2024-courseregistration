const LoanManager = require('../src/examples/loan-manager');

describe('LoanManager Class Tests', () => {
  let loanManager = new LoanManager();

  test('should grant loan if income >= 30000 and has a loan', () => {
    const customer = {
      income: 35000,
      criminalRecord: false,
      hasRequiredDocs: () => true,
      hasLoan: () => true
    };
    expect(loanManager.canGetLoan(customer.income, customer.criminalRecord, customer.hasRequiredDocs(), customer.hasLoan())).toBe(true);
  });

  test('should grant loan if income >= 30000, no loan but has required docs', () => {
    const customer = {
      income: 35000,
      criminalRecord: false,
      hasRequiredDocs: () => true,
      hasLoan: () => false
    };
    expect(loanManager.canGetLoan(customer.income, customer.criminalRecord, customer.hasRequiredDocs(), customer.hasLoan())).toBe(true);
  });

  test('should not grant loan if income >= 30000, no loan, and no required docs', () => {
    const customer = {
      income: 35000,
      criminalRecord: false,
      hasRequiredDocs: () => false,
      hasLoan: () => false
    };
    expect(loanManager.canGetLoan(customer.income, customer.criminalRecord, customer.hasRequiredDocs(), customer.hasLoan())).toBe(false);
  });

  test('should not grant loan if income < 30000 and has a criminal record', () => {
    const customer = {
      income: 25000,
      criminalRecord: true,
      hasRequiredDocs: () => true,
      hasLoan: () => false
    };
    expect(loanManager.canGetLoan(customer.income, customer.criminalRecord, customer.hasRequiredDocs(), customer.hasLoan())).toBe(false);
  });

  test('should grant loan if income < 30000, no criminal record but has required docs', () => {
    const customer = {
      income: 25000,
      criminalRecord: false,
      hasRequiredDocs: () => true,
      hasLoan: () => false
    };
    expect(loanManager.canGetLoan(customer.income, customer.criminalRecord, customer.hasRequiredDocs(), customer.hasLoan())).toBe(true);
  });

  test('should not grant loan if income < 30000, no criminal record, and no required docs', () => {
    const customer = {
      income: 25000,
      criminalRecord: false,
      hasRequiredDocs: () => false,
      hasLoan: () => false
    };
    expect(loanManager.canGetLoan(customer.income, customer.criminalRecord, customer.hasRequiredDocs(), customer.hasLoan())).toBe(false);
  });
});