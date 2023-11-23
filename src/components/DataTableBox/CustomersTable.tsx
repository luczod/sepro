import React, { ChangeEvent, useMemo, useState } from "react";
import DataTableBase from ".";
import FilterComponent from "./Filterfn";

function CustomersTable() {
  return <DataTableBase pagination fixedHeader />;
}
