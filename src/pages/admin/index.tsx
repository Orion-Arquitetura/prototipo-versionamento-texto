import LoginForm from "@/components/LoginForm";
import { parseCookies } from "nookies";

export default function Admin({ cookies }: any) {
  return <LoginForm hasCookies={cookies["user-email"] === undefined ? false : true} />;
}

export async function getServerSideProps(context: any) {
  const cookies = parseCookies(context);

  return {
    props: { cookies },
  };
}
