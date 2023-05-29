import styled from "@emotion/styled";
import { Button, Menu, MenuItem } from "@mui/material";
import Link from "next/link";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import React from "react";
import { useQueryClient } from "@tanstack/react-query";

const StyledLi = styled.li`
  flex: 0 0 calc(33.33% - 10px);
  height: 100px;
  border-radius: 6px;
  background-color: #1b1b3d;
  color: #ffffffdc;
  transition: background-color 0.2s ease, color 0.2s ease;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.3);

  .widget-project-data-div {
    height: 100%;
    display: flex;
    &:hover,
    &:focus {
      /* background-image: url("/orion-estrela.png"); */
      background-size: 155px;
      background-repeat: no-repeat;
      background-position-x: 120%;
      background-position-y: 50%;
    }

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
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  async function deleteProject() {
    await fetch("api/projects/deleteProject", {method: "POST", body: title})
    handleClose()
    refetchProjects()
  }

  const queryClient = useQueryClient();
  
  function refetchProjects() {
    queryClient.invalidateQueries(["Nome-de-projetos"]);
  }

  return (
    <StyledLi>
      <div className="widget-project-data-div">
        <Link href={link}>{title}</Link>
{/* AQUI FICA O MENU DO WIDGET. PENSANDO EM TIRÁ-LO
        <div>
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MoreHorizIcon />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={deleteProject}>Excluir</MenuItem>
            <MenuItem onClick={handleClose}>Renomear</MenuItem>
          </Menu>
        </div> */}
      </div>
    </StyledLi>
  );
}
