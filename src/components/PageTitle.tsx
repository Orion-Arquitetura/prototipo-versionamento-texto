import { Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import styled from "@emotion/styled";
import Router from "next/router";

const StyledButton = styled.button`
      border: solid 2px #1b1b3d;
  border-radius: 50px;
  width: 30px;
  height: 30px;
  display: grid;
  place-items: center;
  background: 0;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover,
  &:focus,
  &:focus-within {
    background-color: #1b1b3d;

    svg {
      color: white;
    }
  }

`;

export default function PageTitle({
    title = "Carregando",
    hasBackButton,
}: {
    title: string;
    hasBackButton?: boolean;
}) {
    return (
        <Box sx={{ display: "flex", alignItems: "center", mb: 2, mt: 2, columnGap: 2 }}>
            {hasBackButton && (
                <StyledButton title="Voltar" onClick={() => Router.back()}>
                    <ArrowBackIcon style={{ border: "solid px red" }} />
                </StyledButton>
            )}
            <h2>{title}</h2>
        </Box>
    );
}
