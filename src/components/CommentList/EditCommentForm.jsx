import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { editComment } from "../../api/comments";
import styles from "./EditCommentForm.module.css";

function EditCommentForm({ domain, postId, commentId, text, setEditing }) {
  const [newText, setNewText] = useState(text);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["comments", domain, postId, commentId],
    mutationFn: (domain, postId, commentId, newText) =>
      editComment(domain, postId, commentId, newText),
    onSuccess: async () => {
      setEditing("");
      await queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });

  const handleChange = (e) => {
    setNewText(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ domain, postId, commentId, newText });
  };

  return (
    <div className={styles.container}>
      {mutation.error &&
        (Array.isArray(mutation.error) ? (
          mutation.error.map((err) => (
            <p className={styles.errorMsg} key={err.msg}>
              {err.msg}
            </p>
          ))
        ) : (
          <p className={styles.errorMsg}>{mutation.error.error}</p>
        ))}

      <form className={styles.form} name="editCommentForm" onSubmit={onSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="edit-comment">
            Edit Comment
          </label>
          <textarea
            className={styles.textarea}
            id="edit-comment"
            name="comment"
            value={newText}
            onChange={handleChange}
            placeholder="Update your thoughts..."
            required
            disabled={mutation.isPending}
          />
        </div>

        <button
          type="submit"
          className={styles.button}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}

export default EditCommentForm;
