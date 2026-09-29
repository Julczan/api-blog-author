import { useParams, Link } from "react-router";
import Navbar from "../Navbar/Navbar";
import { useQuery } from "@tanstack/react-query";
import { getComment } from "../../api/comments";
import styles from "./Comment.module.css";

function Comment({ domain }) {
  const { postId, commentId } = useParams();

  const { data, status, error } = useQuery({
    queryKey: ["comment", domain, postId, commentId],
    queryFn: () => getComment(domain, postId, commentId),
  });

  return (
    <>
      <Navbar />

      <main className={styles.container}>
        <div className={styles.navBar}>
          <Link to={`/posts/${postId}`} className={styles.backLink}>
            &larr; Back to Post
          </Link>
        </div>

        {status === "pending" && (
          <div className={styles.loadingMsg}>Loading comment...</div>
        )}

        {error && <div className={styles.errorMsg}>{error}</div>}

        {data && (
          <article className={styles.commentCard} key={data.id}>
            <header className={styles.header}>
              <div className={styles.author}>{data.author.username}</div>
              <div className={styles.date}>{data.createdAt}</div>
            </header>

            <div className={styles.text}>{data.text}</div>

            {data.updatedAt && (
              <footer className={styles.footer}>
                Updated: {data.updatedAt}
              </footer>
            )}
          </article>
        )}
      </main>
    </>
  );
}

export default Comment;
