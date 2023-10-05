import styled from "styled-components";

export const Header = styled.header`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 50px;
`;

export const InputStyle = styled.div`
  > label {
    > input {
      background-color: white;
      color: #000;
    }
  }
  > input {
    background-color: white;
    color: #000;
  }

  > button {
    /* background-color: white;
    color: #000; */
    min-width: 68.4px;
  }
`;
// minWidth: "".
export const ScrollBarBox = styled.div`
  > div {
    /* width */
    ::-webkit-scrollbar {
      max-width: 10px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px grey;
      border-radius: 10px;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: red;
      border-radius: 10px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: #b30000;
    }
  }
`;
