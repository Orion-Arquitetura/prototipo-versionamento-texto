import { FilesContext } from "@/contexts/FilesContext";
import { projectsData } from "@/utils/projectsObject";
import styled from "@emotion/styled";
import { useContext } from "react";
import DropDownListItem from "./DropDownListItem";

const StyledList = styled.ul`
  min-height: 100vh;
  border-right: solid 1px black;

  & header {
    padding: 20px;
    text-align: center;
    font-family: monospace;
    font-size: 1.2rem;
  }

  & li {
    & li {
      &:hover {
        filter: invert(5%);
      }

      border-bottom: solid 1px black;

      &:first-of-type {
        border-top: solid 1px black;
      }
    }
  }
`;

export default function ProjectsList() {

  return (
    <StyledList>
      <header>PROJETOS</header>
      {projectsData.map((el) => {
        return (
          <DropDownListItem
            key={Math.random() * 100000}
            projectData={el}
          />
        );
      })}
    </StyledList>
  );
}
