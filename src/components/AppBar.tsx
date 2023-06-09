/* eslint-disable @next/next/no-img-element */
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
import Image from "next/image";
import Link from "next/link";
import { parseCookies } from "nookies";
import { useContext, useState, MouseEvent } from "react";

function ResponsiveAppBar() {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const { signOff } = useContext(AuthContext);

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  function logOff() {
    signOff();
    handleCloseUserMenu();
  }

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
                <Link href={"/admin"} onClick={handleCloseUserMenu}>
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
