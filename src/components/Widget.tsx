import styled from "@emotion/styled";
import Link from "next/link";
import React from "react";
import GroupIcon from "@mui/icons-material/Group";
import FolderIcon from "@mui/icons-material/Folder";
import { Grid } from "@mui/material";

const StyledGridItem = styled(Grid)`
  .widget-project-data-div {
    height: 100%;
    display: flex;
    width: 100%;
    height: 100px;
    border-radius: 3px;
    background-color: var(--midnight-green);
    color: #ffffffdc;
    transition: background-color 0.2s ease, color 0.2s ease;
    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.3);
    position: relative;

    &:hover,
    &:focus,
    &:focus-within {
      background-color: var(--gray1);
      background-image: url("/orion-estrela.png");
      background-size: 155px;
      background-repeat: no-repeat;
      background-position-x: 120%;
      background-position-y: 50%;
      color: #1d424d;
    }

    .project-data-icons {
      position: absolute;
      bottom: 0;
      left: 0;
      display: flex;
      margin-left: 16px;
      margin-bottom: 16px;
      column-gap: 10px;

      & a svg {
        width: 20px;
      }
    }

    & > a {
      display: inline-block;
      cursor: pointer;
      font-weight: 500;
      width: 100%;
      padding: 16px;
    }
  }
`;

type WidgetData = {
  title: string;
  link: string;
  projectData: { usuarios: string[]; arquivos: string[] };
};

export default function Widget({ title, link, projectData }: WidgetData) {
  return (
    <StyledGridItem
      item
      xs={2}
    >
      <div className="widget-project-data-div">
        <Link
          href={{
            pathname: link,
          }}
        >
          {title}
        </Link>
        <div className="project-data-icons">
          <FolderIcon fontSize="small" />
          <span>{projectData.arquivos.length}</span>
          <GroupIcon fontSize="small" />
          <span>{projectData.usuarios.length}</span>
        </div>
      </div>
    </StyledGridItem>
  );
}
