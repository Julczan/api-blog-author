import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComment } from "../../api/comments";

function DeleteCommentForm({ domain, postId, commentId }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["deleteComment", domain, postId, commentId],
    mutationFn: (domain, postId, commentId) =>
      deleteComment(domain, postId, commentId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ domain, postId, commentId });
  };

  return (
    <>
      {mutation.isPending && "Editing comment..."}
      {mutation.error && <p>{mutation.error}</p>}
      <form name="editCommentForm" onSubmit={onSubmit}>
        <button type="submit" className="btn btn-primary btn-block">
          Delete
        </button>
      </form>
    </>
  );
}

export default DeleteCommentForm;
