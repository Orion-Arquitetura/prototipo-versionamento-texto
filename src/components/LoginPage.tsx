import LoginForm from "@/components/LoginForm";
import PageWrapper from "@/components/PageWrapper";
import Box from "@mui/material/Box";

export default function LoginPage() {
  return (
    <PageWrapper>
      <Box sx={{display: 'grid', placeItems: 'center'}}>
        <LoginForm />
      </Box>
    </PageWrapper>
  );
}
