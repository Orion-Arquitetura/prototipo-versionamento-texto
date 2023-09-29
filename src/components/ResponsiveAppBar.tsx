/* eslint-disable @next/next/no-img-element */
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import { AuthContext } from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import { IconButton } from "@mui/material";

export default function ResponsiveAppBar({ cookies }: { cookies: any }) {
  const { logOff } = useContext(AuthContext);

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
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Image
          src="/orion-arq-marca-final.svg"
          alt="Orion Arquitetura"
          width={130}
          height={60}
        />

        <Box>
          <Box sx={{ display: "flex", columnGap: "20px", ml: 2, alignItems: "center" }}>
            <Link
              href={`/auth/projetos`}
              style={{ color: "black" }}
            >
              Projetos
            </Link>
            <Link
              href={`/auth/perfil?id=${cookies?._id}&type=${cookies?.tipo}`}
              style={{ color: "black" }}
            >
              Perfil
            </Link>
            {/* {authData?.userType === "funcionario" && <Link
              href={`/auth/tarefas?id=${authData?.userId}`}
              style={{ color: "black" }}
            >
              Tarefas
            </Link>} */}
            {cookies?.tipo === "administrador" && <Link
              href={"/auth/admin"}
              style={{ color: "black" }}
            >
              Painel do administrador
            </Link>}
            <Tooltip title="Sair">
              <IconButton onClick={logOff}>
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
