import { useMutation, useQueryClient } from "@tanstack/react-query";
import { publishPost } from "../../api/posts";
import styles from "./PublishPost.module.css";

function PublishPost({ domain, postId, published }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["publishPost", domain, postId],
    mutationFn: (domain, postId) => publishPost(domain, postId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const handleToggle = () => {
    mutation.mutate({ domain, postId });
  };

  return (
    <div className={styles.container}>
      {mutation.error && <span className={styles.errorMsg}>Update failed</span>}

      <button
        onClick={handleToggle}
        disabled={mutation.isPending}
        className={published ? styles.unpublishBtn : styles.publishBtn}
      >
        {mutation.isPending
          ? published
            ? "Unpublishing..."
            : "Publishing..."
          : published
            ? "Unpublish"
            : "Publish"}
      </button>
    </div>
  );
}

export default PublishPost;
