import React, { useRef, useState } from "react";
import { Button, Input, Option, Select } from "@mui/joy";
import { useConverter } from "../../hooks/useConverter";
import * as Yup from "yup";
import "./Converter.css";
import { useFormik } from "formik";
import { ConverterProps } from "./Converter.types";
import { CurrencyName } from "../../hooks/useConverter.types";

const REQUEST_CURRENCIES: Array<CurrencyName> = ["EUR", "CZK", "GBP"];

const Converter = ({ onSubmit }: ConverterProps) => {
  const { currencies, loading } = useConverter({
    requestCurrencies: REQUEST_CURRENCIES,
  });
  const inputRef = useRef<HTMLInputElement | null>(null);
  const outputRef = useRef<HTMLInputElement | null>(null);
  const [currency, setCurrency] = useState<CurrencyName>(REQUEST_CURRENCIES[0]);

  const formSchema = Yup.object({
    input: Yup.number()
      .min(0, "No negative numbers!")
      .required("Fill the amount of money first!"),
  });

  const formik = useFormik({
    initialValues: {
      input: "",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      onSubmit({
        currency,
        amount: `${values.input}`,
        convertedAmount: outputRef.current?.value,
      });
    },
  });

  const selectOptions = Object.keys(currencies).map((key) => ({
    value: key,
    description: key,
  }));

  const onInputChange = (currencyProp: CurrencyName | null) => {
    if (outputRef.current && inputRef.current) {
      if (inputRef.current?.value === "") {
        outputRef.current.value = "";
        return;
      }

      outputRef.current.value =
        `${(
          currencies[currencyProp || currency] * +inputRef.current.value
        ).toFixed(4)}` || "";
    }
  };

  return loading ? (
    <span>Loading...</span>
  ) : (
    <form className="form" onSubmit={formik.handleSubmit}>
      <div className={"input-wrapper"}>
        <Input
          name="input"
          type="number"
          slotProps={{
            input: { min: 0, ref: inputRef, name: "input", step: 0.01 },
          }}
          className="input"
          placeholder="Amount to convert"
          error={formik.touched.input && Boolean(formik.errors.input)}
          onBlur={formik.handleBlur}
          onChange={(e) => {
            onInputChange(null);
            formik.handleChange(e);
          }}
        />
        <Select
          className={"select"}
          defaultValue={currency}
          onChange={(_, newValue) => {
            onInputChange(newValue);
            setCurrency(newValue as CurrencyName);
          }}
        >
          {selectOptions.map((option, index) => (
            <Option key={index} value={option.value}>
              {option.description}
            </Option>
          ))}
        </Select>
      </div>
      <Input
        type="number"
        slotProps={{ input: { disabled: true, ref: outputRef } }}
        className={"output"}
        placeholder="Conversion in dollars"
        startDecorator="$"
      />
      <Button className={"submit-btn"} type="submit">
        Add to records
      </Button>
      <span className="error">
        {formik.errors.input && formik.touched.input ? formik.errors.input : ""}
      </span>
    </form>
  );
};

export default Converter;
