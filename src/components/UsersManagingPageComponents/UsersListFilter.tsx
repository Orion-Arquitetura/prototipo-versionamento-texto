import styled from "@emotion/styled";
import {
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
} from "@mui/material";

const StyledPaper = styled(Paper)`
  flex-basis: 20%;
  min-height: 20%;
  padding: 10px;
  padding-top: 0;

  display: flex;
  justify-content: center;

  h3 {
    text-align: center;
    padding: 5px 0;
  }

  .form {
    margin-top: 10px;
  }
`;

export default function UsersListFilter({setFilterState}:any) {


  return (
    <StyledPaper>
      <div>
        <h3>Filtros</h3>
        <Divider />
        <FormControl className="form">
          <RadioGroup
            defaultValue="funcionario"
            onChange={(ev) => setFilterState(ev.target.value)}
          >
            <FormControlLabel
              value="funcionario"
              control={<Radio />}
              label="Funcionário"
            />
            <FormControlLabel
              value="administrador"
              control={<Radio />}
              label="Administrador"
            />
            <FormControlLabel
              value="cliente"
              control={<Radio />}
              label="Cliente"
            />
          </RadioGroup>
        </FormControl>
      </div>
    </StyledPaper>
  );
}
