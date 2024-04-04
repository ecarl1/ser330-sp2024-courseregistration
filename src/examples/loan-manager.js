class LoanManager {
  canGetLoan (income, criminalRecord, hasRequiredDocs, hasLoan) {
    if (income >= 30000) {
      if (hasLoan) {
        return true;
      } else {
        return hasRequiredDocs;
      }
    } else {
      if (criminalRecord) {
        return false;
      } else {
        return hasRequiredDocs;
      }
    }
  }
}

module.exports = LoanManager;
