/* eslint-disable @next/next/no-img-element */
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { AuthContext } from "@/contexts/AuthContext";
import PersonIcon from "@mui/icons-material/Person";
import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import { parseCookies } from "nookies";

const settings = ["Perfil", "Sair"];

function ResponsiveAppBar() {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const { signOff } = React.useContext(AuthContext);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  function logOff() {
    signOff();
    handleCloseUserMenu();
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  if (parseCookies()["user-tipo"] === "administrador") {
    return (
      <AppBar
        position="fixed"
        sx={{
          padding: "10px clamp(12px, 10%, 60px)",
          backgroundColor: "#fdfdfd",
        }}
      >
        <Toolbar
          disableGutters
          sx={{ justifyContent: "space-between" }}
        >
          <Image
            src="/orion-arq-marca-final.png"
            alt="Orion Arquitetura"
            width={130}
            height={60}
          />

          <Box>
            <Tooltip title="Menu do usuário">
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{ border: "solid 1px rgba(0,0,0,0.3)" }}
              >
                <PersonIcon />
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: "45px" }}
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem >
                <Link href={"/admin"}>
                  <Typography textAlign="center" width={"100%"}>Painel</Typography>
                </Link>
              </MenuItem>

              <MenuItem >
                <Typography textAlign="center" width={"100%"}>Perfil</Typography>
              </MenuItem>

              <MenuItem onClick={logOff} >
                <Typography textAlign="center" width={"100%"}>Sair</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    );
  }

  return (
    <AppBar
      position="fixed"
      sx={{
        padding: "10px clamp(12px, 10%, 60px)",
        backgroundColor: "#fdfdfd",
      }}
    >
      <Toolbar
        disableGutters
        sx={{ justifyContent: "space-between" }}
      >
        <Image
          src="/orion-arq-marca-final.png"
          alt="Orion Arquitetura"
          width={130}
          height={60}
        />

        <Box>
          <Tooltip title="Menu do usuário">
            <IconButton
              onClick={handleOpenUserMenu}
              sx={{ border: "solid 1px rgba(0,0,0,0.3)" }}
            >
              <PersonIcon />
            </IconButton>
          </Tooltip>

          <Menu
            sx={{ mt: "45px" }}
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem>
              <Typography textAlign="center">Perfil</Typography>
            </MenuItem>

            <MenuItem onClick={logOff}>
              <Typography textAlign="center">Sair</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default ResponsiveAppBar;
