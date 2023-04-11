import { FileContext } from "@/contexts/fileContext";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function BackButton() {
  const { back, asPath } = useRouter();
  const { changeSelectedVersionFile, currentSelectedVersion } = useContext(FileContext);

  return (
    <>
      {asPath === "/projetos" ? null : (
        <button
          title="Voltar"
          onClick={() => {
            currentSelectedVersion !== null
              ? changeSelectedVersionFile(null)
              : () => null;
            back();
          }}
        >
          <ArrowBackIcon />
        </button>
      )}
    </>
  );
}
