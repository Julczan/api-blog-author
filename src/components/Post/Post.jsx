import { useParams } from "react-router";
import Navbar from "../Navbar/Navbar";
import { useQuery } from "@tanstack/react-query";
import { getPost } from "../../api/posts";
import CommentList from "../CommentList/CommentList";
import parse from "html-react-parser";
import { useState } from "react";
import UpdatePostForm from "./UpdatePostForm";
import DeletePostForm from "./DeletePostForm";
import styles from "./Post.module.css";

function Post({ domain }) {
  const { postId } = useParams();
  const [isEditing, setIsEditing] = useState(false);

  const { data, status, error } = useQuery({
    queryKey: ["post", domain, postId],
    queryFn: () => getPost(domain, postId),
  });

  return (
    <>
      <Navbar />

      <main className={styles.container}>
        {status === "pending" && (
          <div className={styles.loadingMsg}>Loading post...</div>
        )}

        {error && <div className={styles.errorMsg}>{error}</div>}

        {data &&
          (isEditing ? (
            <UpdatePostForm
              domain={domain}
              postId={postId}
              text={data.text}
              initialTitle={data.title}
              initialText={data.text}
              setIsEditing={setIsEditing}
            />
          ) : (
            <>
              <article className={styles.post}>
                <div className={styles.authorActions}>
                  <button
                    className={styles.editBtn}
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Post
                  </button>
                  <DeletePostForm domain={domain} postId={postId} />
                </div>

                <header className={styles.header}>
                  <h1 className={styles.title}>{data.title}</h1>
                  <div className={styles.meta}>
                    <span className={styles.author}>
                      By {data.author.username}
                    </span>
                    <span className={styles.date}>
                      Published: {data.createdAt}
                    </span>
                  </div>
                </header>

                <div className={styles.content}>{parse(data.text)}</div>

                <div className={styles.updated}>
                  Last updated: {data.updatedAt}
                </div>
              </article>

              <div className={styles.commentsSection}>
                <CommentList domain={domain} postId={postId} />
              </div>
            </>
          ))}
      </main>
    </>
  );
}

export default Post;
