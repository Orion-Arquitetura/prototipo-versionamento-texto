import styled from "@emotion/styled";
import { ListItem } from "@mui/material";

const StyledListItem = styled(ListItem)`
  display: flex;
  justify-content: space-between;

  .item-icon {
    visibility: hidden;
  }

  &:hover {
    background-color: aliceblue;
    .item-icon {
      visibility: visible;
    }
  }
`;

export default StyledListItem;
