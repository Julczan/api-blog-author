import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost } from "../../api/posts";
import { useNavigate } from "react-router";

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
    const result = confirm("Do you want to delete the post?");
    if (result) {
      mutation.mutate({ domain, postId });
    }
  };

  return (
    <>
      {mutation.isPending && "Deleting comment..."}
      {mutation.error && <p>{mutation.error.error}</p>}
      <form name="editCommentForm" onSubmit={onSubmit}>
        <button type="submit" className="btn btn-primary btn-block">
          Delete Post
        </button>
      </form>
    </>
  );
}

export default DeletePostForm;
