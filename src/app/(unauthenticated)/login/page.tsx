import { Container } from "@mui/material";
import { LoginForm } from "./LoginForm";

const LoginPage = () => {
  return (
    <Container>
      <div className="flex items-center justify-center min-h-[90vh]">
        <div className="w-screen max-w-[700px] -translate-y-1/4 p-3 md:p-11 rounded-md bg-white">
          <LoginForm />
        </div>
      </div>
    </Container>
  );
};

export default LoginPage;
