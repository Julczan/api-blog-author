import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { addComment } from "../../api/comments";

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
    <>
      {mutation.isPending && "Adding comment..."}
      {mutation.error && <p>{mutation.error}</p>}
      <form name="commentForm" onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="comment">Comment</label>
          <input
            id="comment"
            name="comment"
            value={text}
            onChange={handleChange}
            placeholder="coolcoder99"
            type="textarea"
            autoComplete="no"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary btn-block">
          Comment
        </button>
      </form>
    </>
  );
}

export default CommentForm;
