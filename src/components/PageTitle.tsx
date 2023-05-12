import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { useContext } from "react";
import { FileContext } from "@/contexts/filesFiltersContext";
import BackButton from "./BackButton";

const StyledDiv = styled.div`
  padding-bottom: 16px;
  padding-top: 16px;
  padding-left: 16px;
  border-bottom: solid 5px #1b1b3d;
  display: flex;
  column-gap: 15px;
  margin-bottom: 48px;
  letter-spacing: 0.5px;
  color: #1b1b3d;
  background-color: white;
  border-radius: 4px;
  box-shadow: inset -1px -1px 10px rgba(0, 0, 0, 0.1);
  align-items: center;

  & button {
    border: solid 2px #1b1b3d;
    border-radius: 50px;
    width: 30px;
    height: 30px;
    display: grid;
    place-items: center;
    background: 0;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #1b1b3d;

      svg {
        color: white;
      }
    }
  }
`;

export default function PageTitle({ title }: { title: string }) {
  return (
    <StyledDiv>
      <BackButton />
      <div>
        <h2>{title}</h2>
      </div>
    </StyledDiv>
  );
}
