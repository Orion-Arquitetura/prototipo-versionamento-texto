import { Projeto } from "@/utils/types";
import { ListItem } from "@mui/material";
import styled from "@emotion/styled";
import { theme } from "@/theme/theme";
import ProjectsListItemOptions from "./ProjectsListItemOptions";

const StyledListItem = styled(ListItem)`
    background-color: ${theme.palette.primary.main};
    color: white;
    padding: 16px;
    border-radius: 6px;
    justify-content: space-between;
`;

export default function ProjectsListItem({ projeto }: { projeto: Projeto }) {
    return (
        <StyledListItem>
            {projeto.ano}-{projeto.numero > 9 ? projeto.numero : `0${projeto.numero}`}-{projeto.nome}
            <ProjectsListItemOptions projeto={projeto} />
        </StyledListItem>
    )
}