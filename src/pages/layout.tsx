import ResponsiveAppBar from "@/components/AppBar";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import { parseCookies } from "nookies";

const StyledMain = styled.main`
  min-height: 100vh;
  padding-top: 104px;
  padding-bottom: 104px;
  padding-inline: clamp(12px, 10%, 50px);
  background-image: url("/background.png");
  background-size: 90%;
`;

export default function Layout({ children }: any) {
  const { pathname } = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const { "orion-token": token } = parseCookies();

    if (token && pathname !== "/") {
      setLoading(false);
    }

    if (!token && pathname === "/") {
      setLoading(false);
    }

    if (!token && pathname !== "/") {
      pathname !== "/admin" ? setLoading(true) : setLoading(false);
    }
  }, [pathname]);

  return (
    <>
      {pathname === "/" || loading ? null : <ResponsiveAppBar />}
      <StyledMain
        style={pathname === "/" || pathname === "/admin" ? { paddingTop: 0 } : {}}
      >
        {loading ? <Loading /> : children}
      </StyledMain>
    </>
  );
}
