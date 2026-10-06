import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import CommentForm from "./CommentForm";
import EditCommentForm from "./EditCommentForm";
import DeleteCommentForm from "./DeleteCommentForm";
import styles from "./CommentList.module.css";
import { getComments } from "../../api/comments";

function CommentList({ domain, postId }) {
  const [editing, setEditing] = useState("");
  const navigate = useNavigate();

  const { data, status, error } = useQuery({
    queryKey: ["comments", domain, postId],
    queryFn: () => getComments(domain, postId),
  });

  const handleClick = (postId, commentId) => {
    navigate(`/posts/${postId}/comments/${commentId}`);
  };

  return (
    <section className={styles.container}>
      <h2 className={styles.sectionTitle}>Comments</h2>

      <div className={styles.formWrapper}>
        <CommentForm domain={domain} postId={postId} />
      </div>

      {status === "pending" && (
        <div className={styles.loadingMsg}>Loading comments...</div>
      )}
      {error && <div className={styles.errorMsg}>{error}</div>}

      {data && data.length === 0 ? (
        <p className={styles.emptyMsg}>There are no comments yet.</p>
      ) : (
        <div className={styles.list}>
          {data &&
            data.map((comment) =>
              comment.id === editing ? (
                <div key={comment.id} className={styles.editWrapper}>
                  <EditCommentForm
                    domain={domain}
                    postId={postId}
                    commentId={comment.id}
                    text={comment.text}
                    setEditing={setEditing}
                  />
                  <button
                    className={styles.cancelBtn}
                    onClick={() => setEditing("")}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <article className={styles.comment} key={comment.id}>
                  <div
                    className={styles.commentBody}
                    onClick={() => handleClick(postId, comment.id)}
                  >
                    <header className={styles.commentHeader}>
                      <span className={styles.author}>
                        {comment.author.username}
                      </span>
                      <span className={styles.date}>{comment.createdAt}</span>
                    </header>

                    <div className={styles.text}>{comment.text}</div>

                    {comment.updatedAt && (
                      <div className={styles.updated}>
                        Updated: {comment.updatedAt}
                      </div>
                    )}
                  </div>

                  <footer className={styles.actions}>
                    <button
                      className={styles.editBtn}
                      onClick={() => setEditing(comment.id)}
                    >
                      Edit
                    </button>
                    <DeleteCommentForm
                      domain={domain}
                      postId={postId}
                      commentId={comment.id}
                    />
                  </footer>
                </article>
              ),
            )}
        </div>
      )}
    </section>
  );
}

export default CommentList;
