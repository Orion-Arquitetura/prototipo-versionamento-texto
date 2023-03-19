import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import DropDownListItemButton from "../components/DropDownListItemButton";
import { FilesContext } from "@/contexts/FilesContext";
import { useContext } from "react";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion
    disableGutters
    elevation={0}
    square
    {...props}
  />
))(({ theme }) => ({
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? "rgba(255, 255, 255, .05)" : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: 0,
}));

export default function DropDownListItem({ projectData }: any) {
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const { selectProject } = useContext(FilesContext);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <li onClick={() => selectProject(projectData)}>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          aria-controls="panel1d-content"
          id="panel1d-header"
        >
          <Typography>{projectData.projectName}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ul>
            {projectData.files.map((el: any) => {
              return (
                <li key={Math.random() * 10000}>
                  <DropDownListItemButton versionsData={el.versions}>
                    {el.fileName}
                  </DropDownListItemButton>
                </li>
              );
            })}
          </ul>
        </AccordionDetails>
      </Accordion>
    </li>
  );
}
