export const BASE_CURRENCY = "USD";

export type CurrencyName = "EUR" | "CZK" | "GBP";

export type CurrencyType = {
  [key in CurrencyName]: number;
};

export type ConverterProps = {
  baseCurrency?: string;
  requestCurrencies: Array<CurrencyName>;
};
