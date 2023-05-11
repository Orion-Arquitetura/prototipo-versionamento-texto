import styled from "@emotion/styled";
import { useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloseIcon from "@mui/icons-material/Close";

const StyledLi = styled.li`
  display: inline-block;
  flex-basis: 30%;
  transition: background-color 0.2s ease, color 0.2s ease;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.3);
  flex: 0 0 calc(33.33% - 10px);
  margin-right: auto;

  button {
    cursor: pointer;
  }

  .inputModeOn {
    display: flex;
    width: 100%;
    align-items: center;
    height: 100%;

    input {
      padding: 20px;
      display: inline-block;
      font-weight: 500;
      border: 0;
      flex-basis: 85%;
    }

    button {
      height: 100%;
      border: 0;
      flex-basis: 15%;
      background: white;
    }
  }

  .inputModeOff {
    height: 100%;

    button {
      display: flex;
      height: 100%;
      width: 100%;
      align-items: center;
      justify-content: space-between;
      padding: 15px;
    }
  }
`;

export default function AddProject() {
  const [inputMode, setInputMode] = useState(false);

  async function createProject(name:string) {
    const data = await fetch("/api/projetos/createProject", {method: "POST", body: name}).then(res => res.json())
    
    if (data.status === "Criado com sucesso.") {
        window.alert("Criado com sucesso.")
        setInputMode(false)
    }
  }

  function inputModeOn() {
    setInputMode(true)
    setTimeout(() => {
      const input = document.querySelector(".projectNameInput") as HTMLInputElement
      input.focus()
    }, 100)

  }

  function inputKeyDown(event: any) {
    if (event.key === "Enter") {
        createProject(event.target.value)
    }

    if (event.key === "Escape") {
        setInputMode(false)
    }
  }

  return (
    <StyledLi>
      {inputMode ? (
        <div className="inputModeOn">
          <input
            type="text"
            placeholder="Nome do projeto"
            onKeyDown={inputKeyDown}
            className="projectNameInput"
          ></input>
          <button onClick={() => setInputMode(false)}>
            <CloseIcon />
          </button>
        </div>
      ) : (
        <div className="inputModeOff">
          <button onClick={inputModeOn}>
            Adicionar novo projeto <AddCircleIcon />
          </button>
        </div>
      )}
    </StyledLi>
  );
}
