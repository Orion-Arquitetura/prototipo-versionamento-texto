/* eslint-disable @next/next/no-img-element */
import styled from "@emotion/styled";

const StyleDiv = styled.div`
  display: grid;
  height: calc(100vh - 64px);
  place-items: center;
`;

export default function Loading() {
  return (
    <StyleDiv>
      <h3>Carregando...</h3>
    </StyleDiv>
  );
}
