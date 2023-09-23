import { useUpdateTicket } from "@/api-client/tickets";
import { events } from "@/constants/events";
import EventBus from "@/util/event-bus/EventBus";
import { Input } from "@mui/material";
import { useFormik } from "formik";
import { ActionButtons } from "../ActionButtons";
import { useTicketDetailsContext } from "../ticket-details-context";

export const StoryPointsInput = () => {
  const { ticket } = useTicketDetailsContext();

  const { execute } = useUpdateTicket();

  const { values, handleChange, handleBlur, dirty, submitForm, resetForm } =
    useFormik({
      initialValues: { story_points: ticket.story_points },
      enableReinitialize: true,
      onSubmit: async (values) => {
        try {
          await execute(ticket.id, { story_points: values.story_points });
          EventBus.dispatch(events.TICKET_UPDATED);
        } catch (error) {
          console.error(error);
        }
      },
    });

  return (
    <div className="relative">
      <Input
        name="story_points"
        onChange={handleChange}
        onBlur={handleBlur}
        className="max-w-[50px]"
        type="number"
        value={values.story_points}
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
  );
};
