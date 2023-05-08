import LoginForm from "@/components/LoginForm";
import { parseCookies } from "nookies";

export default function Home({ hasCookies }: any) {
  return <LoginForm hasCookies={hasCookies} />;
}

export async function getServerSideProps(context: any) {
  const cookies = parseCookies(context)["orion-token"];

  return {
    props: {
      hasCookies: cookies ? true : false,
    },
  };
}
