import LoginForm from "@/components/LoginForm";
import { parseCookies } from "nookies";
import { GetServerSidePropsContext } from "next";

//essa é a rota "/", que vai mostrar a tela de login caso nao hajam cookies
export default function Home() {
  return <LoginForm />;
}

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   const cookies = parseCookies(context)["orion-token"];

//   if (cookies) {
//     return {
//       redirect: {
//         destination: "/projetos",
//         permanent: false,
//       },
//     };
//   }

//   return { props: {} };
// }
