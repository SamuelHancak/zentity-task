// @ts-ignore
import CurrencyApi from "@everapi/freecurrencyapi-js";
import { useEffect, useState } from "react";
import {
  BASE_CURRENCY,
  ConverterProps,
  CurrencyType,
} from "./useConverter.types";

// data used in case of error - currencies from 07/12/2023
const currenciesBackup = {
  CZK: 22.5445936404,
  EUR: 0.9283201385,
  GBP: 0.7962500905,
};

export const useConverter = ({
  baseCurrency = BASE_CURRENCY,
  requestCurrencies,
}: ConverterProps) => {
  const [currencies, setCurrencies] = useState<CurrencyType>(
    {} as CurrencyType,
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const currencyApi = new CurrencyApi(process.env.REACT_APP_API_KEY);

  useEffect(() => {
    setLoading(true);
    currencyApi
      .latest({
        base_currency: baseCurrency,
        currencies: requestCurrencies,
      })
      .then((response: any) => {
        if (response.message) {
          setError(response.message);
          setCurrencies(currenciesBackup);
          console.warn(
            "In case of error, backup data from 07/12/2023 are used",
          );
        } else {
          setCurrencies(response.data);
        }
      })
      .catch((error: any) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { currencies, error, loading };
};
