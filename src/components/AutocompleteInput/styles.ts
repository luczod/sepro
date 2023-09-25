import styled, { css } from "styled-components";

export const DivInput = styled.div`
  > input {
    width: 25rem;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
`;

export const DivContainer = styled.div`
  position: relative;
`;

export const DivDropdown = styled.div`
  > ul {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    max-height: 200px;
    overflow-y: auto;
    border: 1px solid #ccc;
    border-top: none;
    border-radius: 0 0 4px 4px;
    background-color: #fff;
    z-index: 1;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    list-style: none;
    padding: 0.5rem;

    > li {
      > span {
        padding: 8px 12px;

        cursor: pointer;
        transition: background-color 0.3s ease-in-out;
        :hover {
          background-color: #f5f5f5;
        }
      }
    }
  }
`;
