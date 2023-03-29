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

const StyledImage = styled.img`
  width: 10%;
`;

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

  return (
    <AppBar
      position="fixed"
      sx={{
        padding: "10px clamp(12px, 10%, 60px)",
        backgroundColor: "#fdfdfd",
      }}
    >
      <Toolbar disableGutters sx={{justifyContent: "space-between"}}>
        <StyledImage
          src="./orion-arq-marca-final.png"
          alt="Orion Arquitetura"
        />

        <Box>
          <Tooltip title="Menu do usuário">
            <IconButton
              onClick={handleOpenUserMenu}
              sx={{border: "solid 1px rgba(0,0,0,0.3)"}}
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
            {settings.map((setting) => (
              <MenuItem
                key={setting}
                onClick={setting === "Sair" ? logOff : handleCloseUserMenu}
              >
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
export default ResponsiveAppBar;
