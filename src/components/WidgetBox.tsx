import { Grid } from "@mui/material";

export default function WidgetBox({ children }: any) {
  return (
    <Grid
      container
      columns={6}
      mt={2}
      columnSpacing={5}
    >
      {children}
    </Grid>
  );
}
