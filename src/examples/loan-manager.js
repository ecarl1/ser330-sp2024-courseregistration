
class LoanManager {
  canGetLoan (income, criminalRecord, hasRequiredDocs, hasLoan) {

    const hasCriminalRecord = customer.criminalRecord
    var hasRequiredDocs = customer.hasRequiredDocs()
    var hasLoan = customer.hasLoan()

    if (customer.income >= 30000) {
      if (hasLoan) {
        return true
      } else {
        if (hasRequiredDocs) {
          return true
        } else {
          return false
        }
      }
    } else {
      if (hasCriminalRecord) {
        return false
      } else {
        if (hasRequiredDocs) {
          return true
        } else {
          return false
        }
      }
    }
  }
}

module.exports = LoanManager
