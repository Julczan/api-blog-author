import CommentForm from "./CommentForm";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import EditCommentForm from "./EditCommentForm";
import DeleteCommentForm from "./DeleteCommentForm";
import { useNavigate } from "react-router";
import { getComments } from "../../api/comments";

function CommentList({ domain, postId }) {
  const [editing, setEditing] = useState("");

  const { data, status, error } = useQuery({
    queryKey: ["comments", domain, postId],
    queryFn: () => getComments(domain, postId),
  });

  const navigate = useNavigate();

  const handleClick = (postId, commentId) => {
    navigate(`/posts/${postId}/comments/${commentId}`);
  };

  if (data && data.length === 0) {
    return (
      <>
        <p>There is no comments yet</p>
        <CommentForm domain={domain} postId={postId} />
      </>
    );
  }

  return (
    <>
      {status === "pending" && "Loading..."}
      {error && <p>{error.message}</p>}
      <CommentForm domain={domain} postId={postId} />
      <div className="commentList">
        {data &&
          data.map((comment) =>
            comment.id === editing ? (
              <div key={comment.id}>
                <EditCommentForm
                  domain={domain}
                  postId={postId}
                  commentId={comment.id}
                  text={comment.text}
                  setEditing={setEditing}
                />

                <button onClick={() => setEditing("")}>Cancel</button>
              </div>
            ) : (
              <div className="comment" key={comment.id}>
                <div
                  className="comment-body"
                  onClick={() => handleClick(postId, comment.id)}
                >
                  <div className="comment-author">
                    {comment.author.username}
                  </div>
                  <div className="comment-text">{comment.text}</div>
                  <div className="comment-created">{comment.createdAt}</div>
                  <div className="comment-updated">{comment.updatedAt}</div>
                </div>
                <div className="comment-btns">
                  <button onClick={() => setEditing(comment.id)}>Edit</button>
                  <DeleteCommentForm
                    domain={domain}
                    postId={postId}
                    commentId={comment.id}
                  />
                </div>
              </div>
            ),
          )}
      </div>
    </>
  );
}

export default CommentList;
