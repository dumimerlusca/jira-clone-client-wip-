import { useCreateComment } from "@/api-client/comments";
import { UserAvatar } from "@/components/icons";
import { TextField } from "@mui/material";
import { useFormik } from "formik";
import { object, string } from "yup";
import { ActionButtons } from "../ActionButtons";
import { useTicketDetailsContext } from "../ticket-details-context";
import { useCommentsContext } from "./comments-context";

export const AddComment = () => {
  const { ticket } = useTicketDetailsContext();

  const { execute } = useCreateComment();
  const { mutate } = useCommentsContext();

  const {
    dirty,
    errors,
    values,
    handleChange,
    handleBlur,
    submitForm,
    resetForm,
  } = useFormik({
    initialValues: { text: "" },
    onSubmit: async (values) => {
      try {
        await execute(ticket.id, { text: values.text });
        resetForm();
        mutate();
      } catch (error) {
        console.error(error);
      }
    },
    validationSchema: object().shape({ text: string().required("Required") }),
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div className="flex gap-5 relative">
        <UserAvatar />
        <TextField
          type="text"
          error={!!errors.text}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Add comment..."
          className="grow"
          size="small"
          name="text"
          value={values.text}
          helperText={errors.text}
        />
        {dirty && (
          <div className="mt-2">
            <ActionButtons
              accept={() => {
                submitForm();
              }}
              reject={() => {
                resetForm();
              }}
            />
          </div>
        )}
      </div>
    </form>
  );
};
