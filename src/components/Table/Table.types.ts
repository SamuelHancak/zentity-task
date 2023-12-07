import { CurrencyName } from "../../hooks/useConverter.types";

export type TableValueType = {
  currency: CurrencyName;
  amount: string;
  convertedAmount?: string;
};

export type TableProps = {
  values: Array<TableValueType>;
};
