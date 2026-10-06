import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost } from "../../api/posts";
import { useNavigate } from "react-router";
import styles from "./DeletePostForm.module.css";

function DeletePostForm({ domain, postId }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationKey: ["deletePost", domain, postId],
    mutationFn: (domain, postId) => deletePost(domain, postId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["posts"] });
      navigate("/");
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    const result = window.confirm(
      "Are you sure you want to delete this post? This action cannot be undone.",
    );
    if (result) {
      mutation.mutate({ domain, postId });
    }
  };

  return (
    <form className={styles.form} name="deletePostForm" onSubmit={onSubmit}>
      {mutation.error && (
        <span className={styles.errorMsg}>
          {mutation.error.error || mutation.error.message}
        </span>
      )}

      <button
        type="submit"
        className={styles.deleteBtn}
        disabled={mutation.isPending}
      >
        {mutation.isPending ? "Deleting..." : "Delete Post"}
      </button>
    </form>
  );
}

export default DeletePostForm;
