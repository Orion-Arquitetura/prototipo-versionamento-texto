import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Modal from "@mui/material/Modal";
import { useContext, useState } from "react";
import {
  Checkbox,
  FormGroup,
  FormControlLabel,
  FormLabel,
  Paper,
  Grid,
  Typography,
} from "@mui/material";
import { UserCRUDContext } from "@/contexts/UserCrudContext";
import { ProjectCRUDContext } from "@/contexts/ProjectCrudContext";

const StyledPaper = styled(Paper)`
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
  projectData,
}: any) {
  const [usuariosSelecionados, setUsuariosSelecionados] = useState<
    { id: string; nome: string }[]
  >([]);
  const { getAllUsers } = useContext(UserCRUDContext);
  const { addUsersToProject } = useContext(ProjectCRUDContext);
  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
    refetchOnWindowFocus: false,
  });

  const queryClient = useQueryClient();

  async function refetch() {
    await queryClient.invalidateQueries(["users"]);
  }

  function handleAddUsersToProject() {
    addUsersToProject(usuariosSelecionados, projectData);
    setUsuariosSelecionados([])
    handleCloseModal();
    refetch();
  }

  function cancelSubmit() {
    setUsuariosSelecionados([]);
    handleCloseModal();
  }

  function adicionarOuRemoverUsuariosDoState(projeto: string) {
    const { id, nome } = JSON.parse(projeto);
    const index = usuariosSelecionados.findIndex((element: any) => element.id === id);

    if (index === -1) {
      //se não achar o index significa que não existe esse item na lista, e "const index" retorna -1
      //se nao existe o item na lista, adicionaremos
      setUsuariosSelecionados((prevState) =>
        usuariosSelecionados.length === 0 ? [{ id, nome }] : [...prevState, { id, nome }]
      );
    } else {
      //se já existir o item na lista, removemos
      setUsuariosSelecionados((prevState) => {
        let newArr = [...prevState];
        newArr.splice(index, 1);
        return newArr;
      });
    }
  }

  return (
    <Modal
      open={isOpen}
      onClose={cancelSubmit}
    >
      <StyledPaper>
        <FormGroup
          onChange={(ev) =>
            adicionarOuRemoverUsuariosDoState((ev.target as HTMLInputElement).value)
          }
        >
          <FormLabel sx={{ mb: 2 }}>
            <h3>Adicionar usuarios ao projeto:</h3>{" "}
          </FormLabel>
          <Grid
            container
            columnSpacing={2}
          >
            <Grid
              item
              xs={6}
            >
              <Box
                sx={{
                  border: "solid 1px gray",
                  p: 2,
                  pt: 1,
                  minHeight: "100%",
                  overflowY: "scroll",
                }}
              >
                <Typography
                  variant="h6"
                  textAlign={"center"}
                  borderBottom="solid 1px gray"
                >
                  Funcionários
                </Typography>
                {users?.map((user) => {
                  if (user.nome === "Admin") {
                    return null;
                  }

                  if (user.tipo === "cliente") {
                    return null;
                  }

                  if (
                    projectData.usuarios.some(
                      (usuario: { nome: string; id: string }) =>
                        usuario.nome === user.nome
                    )
                  ) {
                    return null;
                  }
                  return (
                    <FormControlLabel
                      key={user.nome}
                      control={
                        <Checkbox
                          value={JSON.stringify({ id: user._id, nome: user.nome })}
                        />
                      }
                      label={user.nome}
                    />
                  );
                })}
              </Box>
            </Grid>

            <Grid
              item
              xs={6}
            >
              <Box
                sx={{
                  border: "solid 1px gray",
                  p: 2,
                  pt: 1,
                  minHeight: "100%",
                  overflowY: "scroll",
                }}
              >
                <Typography
                  variant="h6"
                  textAlign={"center"}
                  borderBottom="solid 1px gray"
                >
                  Clientes
                </Typography>

                {users?.map((user) => {
                  if (user.nome === "Admin") {
                    return null;
                  }

                  if (user.tipo === "funcionario") {
                    return null;
                  }

                  if (
                    projectData.usuarios.some(
                      (usuario: { nome: string; id: string }) =>
                        usuario.nome === user.nome
                    )
                  ) {
                    return null;
                  }

                  return (
                    <FormControlLabel
                      key={user.nome}
                      control={
                        <Checkbox
                          value={JSON.stringify({ id: user._id, nome: user.nome })}
                        />
                      }
                      label={user.nome}
                    />
                  );
                })}
              </Box>
            </Grid>
          </Grid>

          <Button
            sx={{ mt: 2 }}
            onClick={handleAddUsersToProject}
          >
            Confirmar
          </Button>
        </FormGroup>
      </StyledPaper>
    </Modal>
  );
}
