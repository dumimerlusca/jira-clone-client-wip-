"use client";

import { useUpdateProject } from "@/api-client/projects";
import { events } from "@/constants/events";
import { ActionButtons } from "@/core/features/ticket-details/lib/ActionButtons";
import EventBus from "@/util/event-bus/EventBus";
import { FormHelperText, TextareaAutosize, Typography } from "@mui/material";
import classNames from "classnames";
import { useFormik } from "formik";
import { object, string } from "yup";
import { useProjectDetailsContext } from "../ctx";

export const DescriptionInput = () => {
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
    initialValues: { description: project.description },
    onSubmit: async (values) => {
      try {
        await execute(project.id, { description: values.description });
        EventBus.dispatch(events.PROJECT_UPDATED);
      } catch (error) {
        console.error(error);
      }
    },
    validationSchema: object().shape({
      description: string().required("Required"),
    }),
    enableReinitialize: true,
  });

  return (
    <div>
      <Typography className="font-bold text-gray-600" variant="caption">
        Description
      </Typography>
      <div className="w-full mt-1 relative">
        <TextareaAutosize
          disabled={!hasPermissionToEdit}
          name="description"
          className={classNames(
            "w-full p-3 border-none rounded-md primary/20 resize-y hover:bg-gray-100 outline-none focus:ring-1 focus:ring-primary",
            {
              "ring-1 ring-primary/20": dirty,
              "ring-2 ring-red-600": errors.description,
            }
          )}
          minRows={6}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.description}
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
      {errors.description && (
        <FormHelperText error>{errors.description}</FormHelperText>
      )}
    </div>
  );
};
