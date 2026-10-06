import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../api/posts";
import PublishPost from "./PublishPost";
import { useNavigate } from "react-router";
import styles from "./PostList.module.css";

function PostList({ domain }) {
  const { data, status, error } = useQuery({
    queryKey: ["posts", domain],
    queryFn: () => getPosts(domain),
  });

  const user = localStorage.getItem("User");
  const navigate = useNavigate();

  const handleClick = (postId) => {
    navigate(`/posts/${postId}`);
  };

  if (data && data.length === 0) {
    return <div className={styles.emptyMsg}>No posts yet. Start writing!</div>;
  }

  return (
    <div className={styles.container}>
      {status === "pending" && (
        <div className={styles.loadingMsg}>Loading posts...</div>
      )}

      {error && <div className={styles.errorMsg}>{error}</div>}

      <div className={styles.list}>
        {data &&
          data.map((post) => (
            <div className={styles.card} key={post.id}>
              <div
                className={styles.cardBody}
                onClick={() => handleClick(post.id)}
              >
                <div className={styles.cardHeader}>
                  <span className={styles.author}>{post.author.username}</span>
                  <span className={styles.date}>{post.createdAt}</span>
                </div>

                <h3 className={styles.title}>{post.title}</h3>

                <div className={styles.updated}>
                  Last updated: {post.updatedAt}
                </div>
              </div>

              {user === post.author.username && (
                <div className={styles.actions}>
                  <PublishPost
                    domain={domain}
                    postId={post.id}
                    published={post.published}
                  />
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

export default PostList;
