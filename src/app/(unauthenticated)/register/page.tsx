import React from "react";
import { Container } from "@mui/material";
import { RegisterForm } from "./RegisterForm";

const RegisterPage = () => {
  return (
    <Container>
      <div className="flex items-center justify-center min-h-[90vh]">
        <div className="w-screen max-w-[700px] -translate-y-1/3 p-3 md:p-11 rounded-md bg-white">
          <RegisterForm />
        </div>
      </div>
    </Container>
  );
};

export default RegisterPage;
