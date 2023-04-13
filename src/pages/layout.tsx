import ResponsiveAppBar from "@/components/AppBar";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { parseCookies } from "nookies";
import Loading from "@/components/Loading";

const StyledMain = styled.main`
  min-height: 100vh;
  padding-top: 124px;
  padding-inline: clamp(12px, 10%, 50px);
  background-image: url("/background.png");
  background-size: 90%;
`;

export default function Layout({ children }: any) {
  const { pathname } = useRouter();
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const { "orion-token": token } = parseCookies();

    if (token && pathname !== "/") {
      setLoading(false)
    }

    if (!token && pathname === "/") {
      setLoading(false)
    }

    if (!token && pathname !== "/") {
      setLoading(true)
    }
  }, [pathname]);

  return (
    <>
      {pathname === "/" || loading ? null : <ResponsiveAppBar />}
      <StyledMain style={pathname === "/" ? { paddingTop: 0 } : {}}>
        {loading ? <Loading /> : children}
      </StyledMain>
    </>
  );
}
