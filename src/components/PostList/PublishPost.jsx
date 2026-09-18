import { useMutation, useQueryClient } from "@tanstack/react-query";
import { publishPost } from "../../api/posts";

function PublishPost({ domain, postId, published }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["publishPost", domain, postId],
    mutationFn: (domain, postId) => publishPost(domain, postId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  return (
    <>
      {published ? (
        <button
          onClick={() => {
            mutation.mutate({ domain, postId });
          }}
        >
          Unpublish
        </button>
      ) : (
        <button
          onClick={() => {
            mutation.mutate({ domain, postId });
          }}
        >
          Publish
        </button>
      )}
    </>
  );
}

export default PublishPost;
