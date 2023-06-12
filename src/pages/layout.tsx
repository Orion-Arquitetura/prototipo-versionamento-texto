import ResponsiveAppBar from "@/components/AppBar";
import Router, { useRouter } from "next/router";
import styled from "@emotion/styled";
import { useState } from "react";
import Loading from "@/components/Loading";
import { GetServerSidePropsContext } from "next";
import { parseCookies } from "nookies";

const StyledMain = styled.main`
  min-height: calc(100vh - 84px);
  margin-top: 84px;
  padding-top: 20px;
  padding-inline: clamp(12px, 10%, 50px);
  background-image: url("/background.png");
  background-size: 90%;
`;

export default function Layout({ children }: any) {
  const { pathname } = useRouter();
  const [loading, setLoading] = useState(false);

  // useLayoutEffect(() => {
  //   const { "orion-token": token } = parseCookies();

  //   if (token && pathname !== "/") {
  //     setLoading(false);
  //   }

  //   if (!token && pathname === "/") {
  //     setLoading(false);
  //   }

  //   if (!token && pathname !== "/") {
  //     pathname !== "/admin" ? setLoading(true) : setLoading(false);
  //     Router.replace("/");
  //   }
  // }, [pathname]);

  // return (
  //   <>
  //     {pathname === "/" || loading ? null : <ResponsiveAppBar />}
  //     <StyledMain
  //       style={pathname === "/" || pathname === "/admin" ? { paddingTop: 0 } : {}}
  //     >
  //       {loading ? <Loading /> : children}
  //     </StyledMain>
  //   </>
  // );

  return (
    <>
      {pathname === "/" || loading ? null : <ResponsiveAppBar />}
      <StyledMain
        style={{
          marginTop: pathname === "/" ? 0 : "84px",
          paddingTop: pathname === "/" ? 0 : "20px",
        }}
      >
        {loading ? <Loading /> : children}
      </StyledMain>
    </>
  );
}
