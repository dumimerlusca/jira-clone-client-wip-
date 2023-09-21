import { UserAvatar } from "@/components/icons";
import { TextField } from "@mui/material";
import { useFormik } from "formik";
import { object, string } from "yup";
import { ActionButtons } from "../ActionButtons";
import { useTicketDetailsContext } from "../ticket-details-context";

export const AddComment = () => {
  const { ticket } = useTicketDetailsContext();

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
    onSubmit: (values) => {},
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
        <ActionButtons
          accept={() => {
            submitForm();
          }}
          reject={() => {
            resetForm();
          }}
        />
      </div>
    </form>
  );
};
