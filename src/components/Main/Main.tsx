import React, { useState } from "react";
import "./Main.css";
import Converter from "../Converter/Converter";
import Table from "../Table/Table";
import { TableValueType } from "../Table/Table.types";

const Main = () => {
  const [values, setValues] = useState<Array<TableValueType>>([]);

  const onSubmit = (value: TableValueType) => {
    setValues((prev) => [...prev, value]);
  };

  return (
    <div className={"wrapper"}>
      <Converter onSubmit={onSubmit} />
      <Table values={values} />
    </div>
  );
};

export default Main;
