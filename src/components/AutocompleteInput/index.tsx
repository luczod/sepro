import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { ErrorRequest } from "../../utils/MsgFlash";
import { DivInput, DivContainer, DivDropdown } from "./styles";

const internal = process.env.INTERNAL_HOST;
let listData: any[] | null;
type VarError = {
  Error?: string;
};

interface Option {
  id: number;
  name: string;
}

const NoOptions = [
  {
    id: 1,
    name: "Sem opções",
  },
];

async function ListAllCustomers() {
  let queryList = await axios
    .get("api/database/ListCustomers")
    .then((resposta) => {
      return resposta.data;
    })
    .catch((err: AxiosError) => {
      let msg: VarError = err.response?.data;
      ErrorRequest(msg?.Error || JSON.stringify(err.cause));

      return null;
    });

  return queryList;
}

async function getAllList() {
  listData = await ListAllCustomers();

  return;
}
getAllList();

const AutocompleteInput: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(listData);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    // Filtra as opções com base no valor de entrada
    const filtered = listData.filter((option) =>
      option.name.toLowerCase().includes(value.toLowerCase())
    );

    if (filtered.length > 0) {
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions(NoOptions);
    }
    setShowDropdown(true);
  };

  const handleOptionClick = (option: Option) => {
    if (option.name === "Sem opções") {
      return null;
    }
    setInputValue(option.name);
    console.log(option.id);
    setShowDropdown(false);
  };

  return (
    <DivContainer>
      <DivInput>
        <input
          type="search"
          value={inputValue}
          onChange={handleInputChange}
          className="form-control"
          placeholder="Digite o nome do cliente..."
        />
      </DivInput>

      {showDropdown && (
        <DivDropdown onBlurCapture={() => setShowDropdown(false)}>
          <ul>
            {filteredOptions.map((option) => (
              <li key={option.id} onClick={() => handleOptionClick(option)}>
                {option.name === "Sem opções" ? (
                  option.name
                ) : (
                  <span>{option.name}</span>
                )}
              </li>
            ))}
          </ul>
        </DivDropdown>
      )}
    </DivContainer>
  );
};

export default AutocompleteInput;
