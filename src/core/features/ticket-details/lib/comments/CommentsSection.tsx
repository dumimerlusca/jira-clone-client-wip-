import { AddComment } from "./AddComment";
import { CommentsList } from "./CommentsList";
import { CommentsContextProvider } from "./comments-context";

const CommentsSection = () => {
  return (
    <CommentsContextProvider>
      <AddComment />
      <CommentsList />
    </CommentsContextProvider>
  );
};

export default CommentsSection;
