import { useUpdateProject } from "@/api-client/projects";
import { events } from "@/constants/events";
import { ActionButtons } from "@/core/features/ticket-details/lib/ActionButtons";
import EventBus from "@/util/event-bus/EventBus";
import { FormHelperText, TextareaAutosize } from "@mui/material";
import classNames from "classnames";
import { useFormik } from "formik";
import * as yup from "yup";
import { useProjectDetailsContext } from "../ctx";

export const TitleInput = () => {
  const { project, hasPermissionToEdit } = useProjectDetailsContext();
  const { execute } = useUpdateProject();
  const {
    values,
    handleChange,
    handleBlur,
    resetForm,
    dirty,
    submitForm,
    errors,
  } = useFormik({
    initialValues: { name: project.name },
    onSubmit: async (values) => {
      try {
        await execute(project.id, { name: values.name });
        EventBus.dispatch(events.PROJECT_UPDATED);
      } catch (error) {
        console.error(error);
      }
    },
    validationSchema: yup
      .object()
      .shape({ name: yup.string().required("Required") }),
    enableReinitialize: true,
  });

  return (
    <div className="relative">
      <div className="relative">
        <TextareaAutosize
          name="name"
          disabled={!hasPermissionToEdit}
          onChange={handleChange}
          onBlur={handleBlur}
          className={classNames(
            "text-2xl hover:bg-gray-100 resize-none font-semibold py-2 px-3 text-gray-800 w-full border-none outline-none rounded-md transition-colors duration-300 focus:ring-1 focus:ring-primary",
            {
              "ring-1 ring-primary": dirty,
              "ring-2 ring-red-600": errors.name,
            }
          )}
          value={values.name}
        />
        {dirty && (
          <ActionButtons
            accept={() => {
              submitForm();
            }}
            reject={() => {
              resetForm();
            }}
          />
        )}
      </div>
      {errors.name && <FormHelperText error>{errors.name}</FormHelperText>}
    </div>
  );
};
