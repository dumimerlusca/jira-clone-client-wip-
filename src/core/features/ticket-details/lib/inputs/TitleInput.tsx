import { useUpdateTicket } from "@/api-client/tickets";
import { events } from "@/constants/events";
import EventBus from "@/util/event-bus/EventBus";
import { FormHelperText, TextareaAutosize } from "@mui/material";
import classNames from "classnames";
import { useFormik } from "formik";
import * as yup from "yup";
import { ActionButtons } from "../ActionButtons";
import { useTicketDetailsContext } from "../ticket-details-context";

export const TitleInput = () => {
  const { ticket } = useTicketDetailsContext();
  const { execute } = useUpdateTicket();
  const {
    values,
    handleChange,
    handleBlur,
    resetForm,
    dirty,
    submitForm,
    errors,
  } = useFormik({
    initialValues: { title: ticket.title },
    onSubmit: async (values) => {
      try {
        await execute(ticket.id, { title: values.title });
        EventBus.dispatch(events.TICKET_UPDATED);
      } catch (error) {
        console.error(error);
      }
    },
    validationSchema: yup
      .object()
      .shape({ title: yup.string().required("Required") }),
    enableReinitialize: true,
  });

  return (
    <div className="relative">
      <div className="relative">
        <TextareaAutosize
          name="title"
          onChange={handleChange}
          onBlur={handleBlur}
          className={classNames(
            "text-2xl hover:bg-gray-100 resize-none font-semibold py-2 px-3 text-gray-800 w-full border-none outline-none rounded-md transition-colors duration-300 focus:ring-1 focus:ring-primary",
            {
              "ring-1 ring-primary": dirty,
              "ring-2 ring-red-600": errors.title,
            }
          )}
          value={values.title}
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
      {errors.title && <FormHelperText error>{errors.title}</FormHelperText>}
    </div>
  );
};
