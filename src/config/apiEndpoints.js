require('dotenv').config();

module.exports = {
  CASH_IN_URL: `${process.env.API_BASE_URL}/cash-in`,
  CASH_OUT_NATURAL_URL: `${process.env.API_BASE_URL}/cash-out-natural`,
  CASH_OUT_LEGAL_URL: `${process.env.API_BASE_URL}/cash-out-juridical`,
};
