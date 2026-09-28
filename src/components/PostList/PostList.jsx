import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../api/posts";
import PublishPost from "./PublishPost";
import { useNavigate } from "react-router";

function PostList({ domain }) {
  const { data, status, error } = useQuery({
    queryKey: ["posts", domain],
    queryFn: () => getPosts(domain),
  });

  const user = localStorage.getItem("User");

  const navigate = useNavigate();

  const handleCLick = (postId) => {
    navigate(`/posts/${postId}`);
  };

  return (
    <div className="postList">
      {status === "pending" && "Loading..."}
      {error && <p>{error}</p>}
      {data &&
        data.map((post) => (
          <div
            className="post"
            key={post.id}
            onClick={() => handleCLick(post.id)}
          >
            <div className="post-author">{post.author.username}</div>
            <div className="post-title">{post.title}</div>
            <div className="post-created">{post.createdAt}</div>
            <div className="post-updated">{post.updatedAt}</div>
            {user === post.author.username && (
              <PublishPost
                domain={domain}
                postId={post.id}
                published={post.published}
              />
            )}
          </div>
        ))}
    </div>
  );
}

export default PostList;
