import { useParams } from "react-router";
import Navbar from "../Navbar/Navbar";
import { useQuery } from "@tanstack/react-query";
import { getPost } from "../../api/posts";
import CommentList from "../CommentList/CommentList";
import parse from "html-react-parser";
import { useState } from "react";
import UpdatePostForm from "./UpdatePostForm";
import DeletePostForm from "./DeletePostForm";

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
      {status === "pending" && "Loading..."}
      {error && <p>{error}</p>}
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
            <div className="post" key={data.id}>
              <div className="post-title">{data.author.username}</div>
              <div className="post-title">{data.title}</div>
              <div className="post-text">{parse(data.text)}</div>
              <div className="post-created">{data.createdAt}</div>
              <div className="post-updated">{data.updatedAt}</div>
            </div>
            <button onClick={() => setIsEditing(true)}>Edit Post</button>
            <DeletePostForm domain={domain} postId={postId} />
            <CommentList domain={domain} postId={postId} />
          </>
        ))}
    </>
  );
}

export default Post;
