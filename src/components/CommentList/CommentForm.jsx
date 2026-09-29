import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { addComment } from "../../api/comments";
import styles from "./CommentForm.module.css";

function CommentForm({ domain, postId }) {
  const [text, setText] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["comments", domain, postId],
    mutationFn: (domain, postId, text) => addComment(domain, postId, text),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ domain, postId, text });
    setText("");
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

      <form className={styles.form} name="commentForm" onSubmit={onSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="comment">
            Leave a comment
          </label>
          <textarea
            className={styles.textarea}
            id="comment"
            name="comment"
            value={text}
            onChange={handleChange}
            placeholder="What are your thoughts?"
            required
            disabled={mutation.isPending}
          />
        </div>

        <button
          type="submit"
          className={styles.button}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Posting..." : "Post Comment"}
        </button>
      </form>
    </div>
  );
}

export default CommentForm;
