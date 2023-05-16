import { useRouter } from "next/router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import styled from "@emotion/styled";

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

export default function BackButton() {
  const { back, asPath } = useRouter();

  return (
    <StyledButton
      title="Voltar"
      onClick={back}
    >
      <ArrowBackIcon />
    </StyledButton>
  );
}
