/**
 * EMI Calculator Utilities
 * Calculates monthly EMI, total payable amount, and total interest
 */

/**
 * Calculate Monthly EMI using standard formula
 * EMI = P * r * (1 + r)^n / ((1 + r)^n - 1)
 * where P = Principal, r = monthly rate, n = tenure in months
 */
export const calcEMI = (principal, rate, tenure) => {
  if (principal <= 0 || rate <= 0 || tenure <= 0) return 0
  
  const monthlyRate = rate / 1200 // Convert annual rate to monthly
  const numerator = principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)
  const denominator = Math.pow(1 + monthlyRate, tenure) - 1
  
  return Math.round(numerator / denominator)
}

/**
 * Calculate Total Amount Payable
 */
export const calcTotalPayable = (emi, tenure) => {
  return Math.round(emi * tenure)
}

/**
 * Calculate Total Interest Paid
 */
export const calcTotalInterest = (emi, tenure, principal) => {
  const totalPayable = calcTotalPayable(emi, tenure)
  return Math.round(totalPayable - principal)
}

/**
 * Get EMI breakdown
 */
export const getEMIBreakdown = (principal, rate, tenure) => {
  const emi = calcEMI(principal, rate, tenure)
  const totalPayable = calcTotalPayable(emi, tenure)
  const totalInterest = calcTotalInterest(emi, tenure, principal)
  
  return {
    monthlyEMI: emi,
    totalPayable,
    totalInterest,
    principal,
    rate,
    tenure,
  }
}
