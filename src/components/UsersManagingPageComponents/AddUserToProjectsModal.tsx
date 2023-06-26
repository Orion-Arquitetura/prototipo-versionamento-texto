import { ProjectCRUDContext } from "@/contexts/ProjectCrudContext";
import { UserCRUDContext } from "@/contexts/UserCrudContext";
import styled from "@emotion/styled";
import {
  Paper,
  Modal,
  Checkbox,
  FormControlLabel,
  Typography,
  FormGroup,
  Button,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";

const SyledPaper = styled(Paper)`
  width: 50%;
  position: absolute;
  left: 50%;
  top: 50%;
  translate: -50% -50%;
  padding: 20px;
`;

export default function AddUserToProjectsModal({ isOpen, close, userData, projetos }: any) {
  const { getProjectsMetadata } = useContext(ProjectCRUDContext);
  const { addUserToProjects } = useContext(UserCRUDContext);
  const [projetosSelecionados, setProjetosSelecionados] = useState<
    { id: string; nome: string }[]
  >([]);

  const { data: projects } = useQuery({
    queryKey: ["Projects-metadata"],
    queryFn: getProjectsMetadata,
    refetchOnWindowFocus: false,
  });

  function cancelSubmit() {
    setProjetosSelecionados([]);
    close();
  }

  function handleAddUserToProjects() {
    addUserToProjects(userData, projetosSelecionados);
    setProjetosSelecionados([]);
    close();
  }

  function adicionarOuRemoverUsuariosDoState(projeto: string) {
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
      onClose={cancelSubmit}
      open={isOpen}
    >
      <SyledPaper>
        <Typography>Adicionar usuário aos projetos:</Typography>
        <FormGroup
          onChange={(ev) =>
            adicionarOuRemoverUsuariosDoState((ev.target as HTMLInputElement).value)
          }
        >
          {projects?.map((project) => {
            if (
              projetos.find(
                (projeto: { nome: string; id: string }) => projeto.nome === project.nome
              )
            ) {
              return (
                <FormControlLabel
                  key={project.nome}
                  title="Usuário já pertence a esse projeto"
                  control={
                    <Checkbox
                      disabled
                      value={JSON.stringify({ id: project._id, nome: project.nome })}
                    />
                  }
                  label={project.nome}
                />
              );
            }

            return (
              <FormControlLabel
                key={project.nome}
                control={
                  <Checkbox
                    value={JSON.stringify({ id: project._id, nome: project.nome })}
                  />
                }
                label={project.nome}
              />
            );
          })}
        </FormGroup>
        <Button
          variant="contained"
          disabled={projetosSelecionados.length === 0 ? true : false}
          onClick={handleAddUserToProjects}
        >
          Enviar
        </Button>
      </SyledPaper>
    </Modal>
  );
}
