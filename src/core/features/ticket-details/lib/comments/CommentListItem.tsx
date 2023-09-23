import { useDeleteComment, useUpdateComment } from "@/api-client/comments";
import { UserAvatar } from "@/components/icons";
import { Comment } from "@/types/comments";
import { formatDate } from "@/util/helpers/misc.helpers";
import { Button, TextareaAutosize, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { useCommentsContext } from "./comments-context";

export const CommentListItem = ({ comment }: { comment: Comment }) => {
  const [editing, setEditing] = useState(false);
  const { mutate } = useCommentsContext();

  const { execute: deleteComment } = useDeleteComment();

  return (
    <li className="p-2">
      <div className="flex gap-5">
        <UserAvatar className="w-7 h-7" />
        <div className="w-full">
          <div>
            <Typography className="font-semibold text-gray-600 inline">
              {comment.author.username}
            </Typography>
            <span className="text-sm ml-3 text-gray-600">
              {formatDate(comment.created_at)}
            </span>
          </div>

          {editing ? (
            <TextEditField
              commentId={comment.id}
              onExitEdit={() => {
                setEditing(false);
              }}
              text={comment.text}
            />
          ) : (
            <Typography className="font-light text-sm">
              {comment.text}
            </Typography>
          )}

          {!editing && (
            <div className="flex items-center gap-2 mt-2">
              <button
                className="font-semibold text-blue-500"
                onClick={() => {
                  setEditing(true);
                }}
              >
                Edit
              </button>
              <button
                className="font-semibold text-red-500"
                onClick={async () => {
                  if (
                    window.confirm(
                      "Are you sure you want to delete this comment?"
                    )
                  ) {
                    try {
                      await deleteComment(comment.id);
                      mutate();
                    } catch (error) {
                      console.error(error);
                    }
                  }
                }}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </li>
  );
};

const TextEditField = ({
  text,
  onExitEdit,
  commentId,
}: {
  text: string;
  onExitEdit: () => void;
  commentId: string;
}) => {
  const { mutate } = useCommentsContext();
  const { execute, isLoading } = useUpdateComment();

  const { values, handleChange, handleBlur, submitForm, dirty } = useFormik({
    initialValues: { text: text },
    onSubmit: async (values) => {
      try {
        await execute(commentId, { text: values.text });
        mutate();
        onExitEdit();
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <div>
      <TextareaAutosize
        name="text"
        onChange={handleChange}
        onBlur={handleBlur}
        className="w-full p-2 rounded-md"
        value={values.text}
        minRows={5}
      />
      <div className="flex gap-1 w-full">
        <Button
          onClick={onExitEdit}
          color="info"
          variant="contained"
          size="small"
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          disabled={isLoading || !dirty}
          color="primary"
          variant="contained"
          size="small"
          onClick={() => {
            submitForm();
          }}
        >
          Save
        </Button>
      </div>
    </div>
  );
};
