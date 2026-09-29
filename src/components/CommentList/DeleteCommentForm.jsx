import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComment } from "../../api/comments";
import styles from "./DeleteCommentForm.module.css";

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
    const result = window.confirm(
      "Are you sure you want to delete this comment?",
    );
    if (result) {
      mutation.mutate({ domain, postId, commentId });
    }
  };

  return (
    <form className={styles.form} name="deleteCommentForm" onSubmit={onSubmit}>
      {mutation.error && (
        <span className={styles.errorMsg}>{mutation.error}</span>
      )}

      <button
        type="submit"
        className={styles.deleteBtn}
        disabled={mutation.isPending}
        aria-label="Delete comment"
      >
        {mutation.isPending ? "Deleting..." : "Delete"}
      </button>
    </form>
  );
}

export default DeleteCommentForm;
