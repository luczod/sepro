import { ChangeEvent } from "react";

interface IPropFilter {
  filterText: string;
  onFilter: (e: ChangeEvent<HTMLInputElement>) => void;
}
// { filterText, onFilter, onClear }
const FilterComponent = ({ filterText, onFilter }: IPropFilter) => {
  return (
    <div className="input-group" style={{ maxWidth: "16rem" }}>
      <input
        id="search"
        type="search"
        className="form-control"
        placeholder="pesquisa"
        aria-label="Search"
        value={filterText}
        onChange={onFilter}
      />
    </div>
  );
};

export default FilterComponent;
