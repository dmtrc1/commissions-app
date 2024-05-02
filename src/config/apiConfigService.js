const axios = require("axios");

const {
  CASH_IN_URL,
  CASH_OUT_NATURAL_URL,
  CASH_OUT_LEGAL_URL,
} = require("./apiEndpoints");

const cache = {};

async function fetchConfig(url) {
  if (cache[url]) {
    return cache[url]; // Return cached data if available
  }
  try {
    const response = await axios.get(url);
    cache[url] = response.data; // Cache the response
    return response.data;
  } catch (error) {
    console.error(`Error fetching config from ${url}:`, error.message);
    throw error; // Ensure errors are thrown
  }
}

exports.fetchCashInConfig = function () {
  return fetchConfig(CASH_IN_URL);
};

exports.fetchCashOutNaturalConfig = function () {
  return fetchConfig(CASH_OUT_NATURAL_URL);
};

exports.fetchCashOutLegalConfig = function () {
  return fetchConfig(CASH_OUT_LEGAL_URL);
};
