import styled from "@emotion/styled";
import { useContext } from "react";
import { FileContext } from "@/contexts/fileContext";

const Styled = styled.div`
  padding: 10px 20px;
  font-family: monospace;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-right: solid 1px black;
  border-left: solid 1px black;
  flex-grow: 1;
  margin-inline: 10px;
`;

export default function FileStatus() {
  const { currentSelectedVersion } = useContext(FileContext);

  if (currentSelectedVersion === null) {
    return null
  }

  return (
    <Styled>
      <div>
        <p>
          <strong>Versão:</strong>
        </p>
        <p>{currentSelectedVersion?.versao}</p>
      </div>

      <div>
        <p>
          <strong>Alterações da versão:</strong>
        </p>
        <p>{currentSelectedVersion?.comentario}</p>
      </div>

      <div>
        <p>
          <strong>Responsável pela versão:</strong>
        </p>
        <p>{currentSelectedVersion?.responsavel}</p>
      </div>

      <div>
        <p>
          <strong>Data da versão:</strong>
        </p>
        <p>{currentSelectedVersion?.data}</p>
      </div>
    </Styled>
  );
}
