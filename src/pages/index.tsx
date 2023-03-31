import Box from "@mui/material/Box";
import LoginForm from "@/components/LoginForm";
import { parseCookies } from "nookies";

export default function Home({hasCookies}:any) {
  return (
    <Box sx={{ display: "grid", placeItems: "center", height: "100vh" }}>
      <LoginForm hasCookies={hasCookies} />
    </Box>
  );
}

export async function getServerSideProps(context:any) {
  const cookies = parseCookies(context)["orion-token"]

  return {
    props: {
      hasCookies: cookies ? true : false
    }
  }
}
