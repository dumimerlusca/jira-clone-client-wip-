import { useCreateProject } from "@/api-client/projects";
import { events } from "@/constants/events";
import EventBus from "@/util/event-bus/EventBus";
import {
  Button,
  FormHelperText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";

export const CreateProjectForm = ({
  onSuccess,
}: {
  onSuccess?: () => void;
}) => {
  const { error, execute, isLoading, success } = useCreateProject();

  const { values, handleSubmit, handleChange, errors, handleBlur } = useFormik({
    initialValues: {
      name: "",
      description: "",
      key: "",
    },
    onSubmit: async (values) => {
      try {
        await execute(values);
        EventBus.dispatch(events.PROJECT_CREATED);
        onSuccess?.();
      } catch (error) {
        console.error(error);
      }
    },
    validationSchema: getValidationSchema(),
  });
  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <TextField
          className="w-full"
          name="name"
          autoComplete="NONE"
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!errors.name}
          value={values.name}
          variant="outlined"
          label="Project name *"
          color="primary"
          helperText={errors.name}
        />
        <TextField
          className="w-full"
          name="description"
          autoComplete="NONE"
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!errors.description}
          value={values.description}
          variant="outlined"
          label="Description *"
          color="primary"
          helperText={errors.description}
        />
        <TextField
          className="w-full"
          name="key"
          autoComplete="NONE"
          onChange={(e) => {
            e.target.value = e.target.value.toUpperCase();
            handleChange(e);
          }}
          onBlur={handleBlur}
          error={!!errors.key}
          value={values.key}
          variant="outlined"
          label="Project KEY *"
          color="primary"
          helperText={
            <>
              {errors.key && (
                <Typography className="text-xs mb-1">{errors.key}</Typography>
              )}
              <Typography paragraph className="text-xs text-indigo-500">
                It will be linked to the ticket number for better tracking
                (PRN-7658)
              </Typography>
            </>
          }
          placeholder="Ex: PRN"
        />
        <Button disabled={isLoading} variant="contained" type="submit">
          Create project
        </Button>
        {success && (
          <FormHelperText className="text-green-500">
            Project created successfully
          </FormHelperText>
        )}
        {error && <FormHelperText error>{error.message}</FormHelperText>}
      </Stack>
    </form>
  );
};

function getValidationSchema() {
  return yup.object().shape({
    name: yup.string().required("Required"),
    description: yup.string().required("Required"),
    key: yup
      .string()
      .required("Required")
      .min(2, "Should be between 2 and 4 characters")
      .max(4, "Should be between 2 and 4 characters"),
  });
}
