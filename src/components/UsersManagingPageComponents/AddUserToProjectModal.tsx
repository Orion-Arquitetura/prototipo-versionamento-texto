import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useQuery } from "@tanstack/react-query";
import Modal from "@mui/material/Modal";
import { useContext, useState } from "react";
import { Checkbox, FormGroup, FormControlLabel, FormLabel } from "@mui/material";
import { ProjectCRUDContext } from "@/contexts/ProjectCrudContext";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  row-gap: 15px;
  height: 100%;
`;

const StyledBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #f5f5f5;
  height: 350px;
  box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.5);
  padding: 16px;
  min-width: 50%;
  height: fit-content;
`;
export default function AddUserToProjectModal({
  isOpen,
  handleCloseModal,
  userId,
  userName,
  userProjects,
}: any) {
  const { projetos } = useContext(ProjectCRUDContext);
  const [projetosSelecionados, setProjetosSelecionados] = useState<
    { id: string; nome: string }[]
  >([]);

  async function enviarModificacoes() {
    const resposta = await fetch("/api/user/addUserToProject", {
      method: "POST",
      body: JSON.stringify({ userID: userId, projects: projetosSelecionados }),
    });
  }

  function adicionarOuRemoverProjetoAoState(projeto: string) {
    const { id, nome } = JSON.parse(projeto);
    const index = projetosSelecionados.findIndex((element: any) => element.id === id);

    if (index === -1) {
      //se não achar o index significa que não existe esse item na lista, e "const index" retorna -1
      //se nao existe o item na lista, adicionaremos
      setProjetosSelecionados((prevState) =>
        projetosSelecionados.length === 0 ? [{ id, nome }] : [...prevState, { id, nome }]
      );
    } else {
      //se já existir o item na lista, removemos
      setProjetosSelecionados((prevState) => {
        let newArr = [...prevState];
        newArr.splice(index, 1);
        return newArr;
      });
    }
  }

  return (
    <Modal
      open={isOpen}
      onClose={handleCloseModal}
    >
      <StyledBox>
        <FormGroup
          onChange={(ev) =>
            adicionarOuRemoverProjetoAoState((ev.target as HTMLInputElement).value)
          }
        >
          <FormLabel>Adicionar {userName} a projetos: </FormLabel>
          {projetos.map((projeto) => {
            return (
              <FormControlLabel
                key={projeto.nome}
                control={
                  <Checkbox
                    value={JSON.stringify({ id: projeto._id, nome: projeto.nome })}
                  />
                }
                label={projeto.nome}
              />
            );
          })}
        </FormGroup>
        <Button onClick={enviarModificacoes}>Confirmar</Button>
      </StyledBox>
    </Modal>
  );
}
