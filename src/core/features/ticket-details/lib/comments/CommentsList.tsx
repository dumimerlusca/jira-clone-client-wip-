import { CommentListItem } from "./CommentListItem";
import { useCommentsContext } from "./comments-context";

export const CommentsList = () => {
  const { comments } = useCommentsContext();
  return (
    <ul className="space-y-4">
      {comments.map((comment) => {
        return <CommentListItem key={comment.id} comment={comment} />;
      })}
    </ul>
  );
};
