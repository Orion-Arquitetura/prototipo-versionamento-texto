import ResponsiveAppBar from "@/components/AppBar";
import { useRouter } from "next/router";
import styled from "@emotion/styled";

const StyledMain = styled.main`
  min-height: 100vh;
  padding-top: 124px;
  padding-inline: clamp(12px, 10%, 50px);
  background-image: url("background.png");
  background-size: 90%;
`;

export default function Layout({ children }: any) {
  const { pathname } = useRouter();

  return (
    <>
      {pathname === "/" ? null : <ResponsiveAppBar />}
      <StyledMain style={pathname === "/" ? {paddingTop: 0} : {}}>{children}</StyledMain>
    </>
  );
}
