import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { editComment } from "../../api/comments";

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
    setNewText("");
  };

  return (
    <>
      {mutation.isPending && "Editing comment..."}
      {mutation.error &&
        mutation.error.map((err) => <p key={err.msg}>{err.msg}</p>)}
      <form name="editCommentForm" onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="comment">Comment</label>
          <input
            id="comment"
            name="comment"
            value={newText}
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

export default EditCommentForm;
