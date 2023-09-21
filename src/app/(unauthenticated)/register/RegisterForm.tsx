"use client";

import { useRegister } from "@/api-client/auth";
import { saveTokenToLocalStorage } from "@/util/helpers/auth.helpers";
import {
  Button,
  FormHelperText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as yup from "yup";

export const RegisterForm = () => {
  const { execute, isLoading, error, success } = useRegister();
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
        />

        <TextField
          name="password"
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!errors.password}
          value={values.password}
          variant="filled"
          type="password"
          label="Password"
          helperText={errors.password}
        />
        <Button disabled={isLoading} type="submit" variant="contained">
          Register new account
        </Button>
        {error && <FormHelperText error>{error.message}</FormHelperText>}
        {success && (
          <FormHelperText className="text-green-500">
            Account created successfully!
          </FormHelperText>
        )}
        <Typography>
          You already have an account? <Link href={"/login"}>Login</Link>
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
