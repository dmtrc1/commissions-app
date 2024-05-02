const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");
const {
  CASH_IN_URL,
  CASH_OUT_NATURAL_URL,
  CASH_OUT_LEGAL_URL,
} = require("../src/config/apiEndpoints");
const {
  fetchCashInConfig,
  fetchCashOutNaturalConfig,
  fetchCashOutLegalConfig,
} = require("../src/config/apiConfigService");

describe("API Config Service", () => {
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.restore();
  });

  it("should fetch cash in configuration", async () => {
    const cashInConfig = {
      percents: 0.03,
      max: { amount: 5, currency: "EUR" },
    };
    mock.onGet(CASH_IN_URL).reply(200, cashInConfig);
    const config = await fetchCashInConfig();
    expect(config).toEqual(cashInConfig);
  });

  it("should fetch cash out natural configuration", async () => {
    const cashOutNaturalConfig = {
      percents: 0.3,
      week_limit: { amount: 1000, currency: "EUR" },
    };
    mock.onGet(CASH_OUT_NATURAL_URL).reply(200, cashOutNaturalConfig);
    const config = await fetchCashOutNaturalConfig();
    expect(config).toEqual(cashOutNaturalConfig);
  });

  it("should fetch cash out legal configuration", async () => {
    const cashOutLegalConfig = {
      percents: 0.3,
      min: { amount: 0.5, currency: "EUR" },
    };
    mock.onGet(CASH_OUT_LEGAL_URL).reply(200, cashOutLegalConfig);
    const config = await fetchCashOutLegalConfig();
    expect(config).toEqual(cashOutLegalConfig);
  });
});
