import styled from "@emotion/styled";
import Link from "next/link";

const StyledLi = styled.li`
  flex: 0 0 calc(33.33% - 10px);
  height: 100px;
  border-radius: 6px;
  background-color: #1b1b3d;
  color: #ffffffdc;
  transition: background-color 0.2s ease, color 0.2s ease;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.3);

  &:hover,
  &:focus-within {
    background-color: #d8d8d890;
    color: darkblue;
    background-image: url("/orion-estrela.png");
    background-size: 155px;
    background-repeat: no-repeat;
    background-position-x: 120%;
    background-position-y: 50%;
  }

  .widget-project-data-div {
    height: 100%;
    
    & a {
      padding: 20px;
      display: inline-block;
      height: 100%;
      width: 100%;
      cursor: pointer;
      font-weight: 500;
    }
  }
`;

type WidgetData = {
  title: string;
  link: string;
};

export default function Widget({ title, link }: WidgetData) {
  return (
    <StyledLi>
      <div className="widget-project-data-div">
        <Link href={link}>{title}</Link>
      </div>
    </StyledLi>
  );
}
