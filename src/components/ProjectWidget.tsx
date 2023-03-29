import styled from "@emotion/styled";
import Link from "next/link";

const StyledLi = styled.li`
  display: inline-block;
  flex-basis: 30%;
  border-radius: 6px;
  background-color: #1b1b3d;
  color: #ffffffdc;
  transition: background-color 0.2s ease, color 0.2s ease;
  box-shadow: 1px 1px 10px      rgba(0, 0, 0, 0.3);

  &:hover, &:focus-within {
    background-color: #d8d8d829;
    color: darkblue;
    background-image: url("./orion-estrela.png");
    background-size: 155px;
    background-repeat: no-repeat;
    background-position-x: 120%;
    background-position-y: 50%;
  }

  a {
    padding: 20px;
    display: inline-block;
    width: 100%;
    cursor: pointer;
    font-weight: 500;
  }
`;

type ProjectWidgetData = {
  projectName: string;
  link: string;
};

export default function ProjectWidget({ projectName, link }: ProjectWidgetData) {
  return (
    <StyledLi>
      <Link href={link}>{projectName}</Link>
    </StyledLi>
  );
}
