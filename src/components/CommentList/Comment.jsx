import { useParams } from "react-router";
import Navbar from "../Navbar/Navbar";
import { useQuery } from "@tanstack/react-query";
import { getComment } from "../../api/comments";

function Comment({ domain }) {
  const { postId, commentId } = useParams();

  const { data, status, error } = useQuery({
    queryKey: ["comment", domain, postId, commentId],
    queryFn: () => getComment(domain, postId, commentId),
  });

  return (
    <>
      <Navbar />
      {status === "pending" && "Loading..."}
      {error && <p>{error.message}</p>}
      {data && (
        <>
          <div className="comment" key={data.id}>
            <div className="comment-title">{data.title}</div>
            <div className="comment-author">{data.author.username}</div>
            <div className="comment-text">{data.text}</div>
            <div className="comment-created">{data.createdAt}</div>
            <div className="comment-updated">{data.updatedAt}</div>
          </div>
        </>
      )}
    </>
  );
}

export default Comment;
