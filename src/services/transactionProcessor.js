const moment = require("moment");

// Helper function to calculate the week number
function getWeekOfYear(date) {
  return (
    moment(date, "YYYY-MM-DD").isoWeekYear() + "-" + moment(date).isoWeek()
  );
}

// Helper function to round up to the nearest cent
function roundUp(value) {
  return Math.ceil(value * 100) / 100;
}

// Stores total weekly cash-out amounts for natural persons
let weeklyWithdrawals = {};

function calculateCashInFee(amount) {
  const feePercent = 0.03;
  const maxFee = 5;
  const fee = Math.min((amount * feePercent) / 100, maxFee);
  return roundUp(fee);
}

function calculateCashOutJuridicalFee(amount) {
  const feePercent = 0.3;
  const minFee = 0.5;
  const fee = Math.max((amount * feePercent) / 100, minFee);
  return roundUp(fee);
}

function calculateCashOutNaturalFee(amount, date, userId) {
  const week = getWeekOfYear(date);
  const weekLimit = 1000;
  if (!weeklyWithdrawals[userId]) {
    weeklyWithdrawals[userId] = {};
  }
  if (!weeklyWithdrawals[userId][week]) {
    weeklyWithdrawals[userId][week] = 0;
  }

  weeklyWithdrawals[userId][week] += amount;
  if (weeklyWithdrawals[userId][week] > weekLimit) {
    let taxableAmount = weeklyWithdrawals[userId][week] - weekLimit;
    if (taxableAmount > amount) {
      taxableAmount = amount; // Only tax the part of this transaction that exceeds the limit
    }
    return roundUp((taxableAmount * 0.3) / 100);
  }
  return 0;
}

function processTransaction(transaction) {
  switch (transaction.type) {
    case "cash_in":
      return calculateCashInFee(transaction.operation.amount);
    case "cash_out":
      if (transaction.user_type === "natural") {
        return calculateCashOutNaturalFee(
          transaction.operation.amount,
          transaction.date,
          transaction.user_id
        );
      } else if (transaction.user_type === "juridical") {
        return calculateCashOutJuridicalFee(transaction.operation.amount);
      }
      break;
  }
}

module.exports = {
  processTransaction,
};
