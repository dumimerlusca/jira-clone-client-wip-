import { useCreateTicket } from "@/api-client/tickets";
import { ticketPriorityList, ticketTypeList } from "@/constants/tickets";
import { useProjectContext } from "@/context/project-context";
import { TicketPriority, TicketStatus, TicketType } from "@/types/tickets";
import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import classNames from "classnames";
import { useFormik } from "formik";
import * as yup from "yup";
import { ProjectSelector } from "./ProjectSelector";

export const CreateTicketForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const { execute, isLoading, error, success } = useCreateTicket();
  const { projectId } = useProjectContext();

  const {
    handleBlur,
    handleChange,
    errors,
    values,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    onSubmit: async ({ projectId, ...rest }) => {
      try {
        await execute(projectId!, rest);
        onSuccess?.();
      } catch (error) {
        console.log(error);
      }
    },
    initialValues: {
      title: "",
      description: "",
      priority: TicketPriority.medium,
      status: TicketStatus.open,
      story_points: 0,
      type: TicketType.bug,
      projectId: projectId,
    },
    validationSchema: getValidationSchema(),
  });

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <div className="flex items-center gap-5">
          <Typography className="text-primary">Project:</Typography>
          <ProjectSelector
            selectedProjectId={values.projectId}
            onChange={(id) => {
              setFieldValue("projectId", id);
            }}
          />
        </div>
        <TextField
          size="small"
          className="w-full"
          name="title"
          autoComplete="NONE"
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!errors.title}
          value={values.title}
          variant="outlined"
          label="Title *"
          color="primary"
          helperText={errors.title}
        />
        <div className="w-full flex flex-col">
          <InputLabel>Summary *</InputLabel>
          <TextareaAutosize
            className={classNames("p-3 border-[0.5px]  rounded-sm", {
              "border-red-700 outline-red-700": errors.description,
              "border-black/20 outline-primary ": !errors.description,
            })}
            minRows={5}
            onChange={handleChange}
            value={values.description}
            name="description"
          />
          {errors.description && (
            <FormHelperText error>{errors.description}</FormHelperText>
          )}
        </div>

        <FormControl error={!!errors.type}>
          <InputLabel id="label-type" size="small">
            Type
          </InputLabel>
          <Select
            displayEmpty
            label="Type *"
            labelId="label-type"
            size="small"
            name="type"
            variant="outlined"
            onChange={handleChange}
            value={values.type}
          >
            {ticketTypeList.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
          {errors.type && <FormHelperText>{errors.type}</FormHelperText>}
        </FormControl>

        <FormControl error={!!errors.priority}>
          <InputLabel id="label-prority" size="small">
            Priority
          </InputLabel>
          <Select
            name="priority"
            displayEmpty
            label="Priority *"
            labelId="label-prority"
            size="small"
            variant="outlined"
            onChange={handleChange}
            value={values.priority}
          >
            {ticketPriorityList.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
          {errors.priority && (
            <FormHelperText>{errors.priority}</FormHelperText>
          )}
        </FormControl>

        <TextField
          size="small"
          className="w-full"
          name="story_points"
          autoComplete="NONE"
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!errors.story_points}
          value={values.story_points}
          variant="outlined"
          label="Story Points"
          color="primary"
          type="number"
          helperText={errors.story_points}
        />

        <Button
          disabled={isLoading}
          variant="contained"
          color="primary"
          type="submit"
        >
          Submit
        </Button>

        {error && <FormHelperText error>{error.message}</FormHelperText>}

        {success && (
          <FormHelperText className="text-green-500">
            Ticket created successfully
          </FormHelperText>
        )}
      </Stack>
    </form>
  );
};

function getValidationSchema() {
  return yup.object().shape({
    title: yup.string().required("Required"),
    description: yup.string().required("Required"),
    priority: yup.number().required("Required"),
    type: yup.string().required("Required"),
    projectId: yup.string().required("Required"),
  });
}
