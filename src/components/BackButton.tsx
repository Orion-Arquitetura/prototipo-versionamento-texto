import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function BackButton() {
  const { back, asPath } = useRouter();

  return (
    <>
      {asPath === "/projetos" ? null : (
        <button
          title="Voltar"
          onClick={back}
        >
          <ArrowBackIcon />
        </button>
      )}
    </>
  );
}
