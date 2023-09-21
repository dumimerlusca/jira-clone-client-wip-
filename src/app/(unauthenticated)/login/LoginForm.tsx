"use client";

import { login } from "@/api-client/auth";
import { saveTokenToLocalStorage } from "@/util/helpers/auth.helpers";
import { useAsyncFunc } from "@/util/hooks";
import {
  Button,
  CircularProgress,
  FormHelperText,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import * as yup from "yup";

export const LoginForm = () => {
  const { execute, isLoading, error } = useAsyncFunc<typeof login>(login);

  const router = useRouter();

  const { handleSubmit, handleBlur, handleChange, errors, values } = useFormik({
    onSubmit: async (values) => {
      try {
        const res = await execute(values);
        saveTokenToLocalStorage(res.data.token);
        router.push("/");
      } catch (error) {
        console.error(error);
      }
    },
    initialValues: { username: "", password: "" },
    validationSchema: getValidationSchema(),
  });

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <TextField
          onChange={handleChange}
          name="username"
          onBlur={handleBlur}
          value={values.username}
          error={!!errors.username}
          helperText={errors.username}
          label="Username"
          variant="filled"
          autoComplete="username"
        />

        <TextField
          name="password"
          autoComplete="password"
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!errors.password}
          value={values.password}
          variant="filled"
          type="password"
          label="Password"
          helperText={errors.password}
        />
        <Button
          size="large"
          disabled={isLoading}
          type="submit"
          variant="contained"
        >
          {isLoading ? <CircularProgress size={26} color="info" /> : "Login"}
        </Button>
        <FormHelperText error className="font-medium">
          {createErrorMessage(error)}
        </FormHelperText>
        <Typography>
          <Link href={"/register"}>Signup</Link> if you dont have an account
          already
        </Typography>
      </Stack>
    </form>
  );
};

function getValidationSchema() {
  return yup.object().shape({
    username: yup.string().required("Required"),
    password: yup.string().required("Required"),
  });
}

function createErrorMessage(error: AxiosError | undefined) {
  if (!error) return undefined;
  if (error.response?.status === 401) {
    return "Bad credentials";
  }

  return error.message;
}
