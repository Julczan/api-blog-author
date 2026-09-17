import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../api/posts";

function PostList({ domain }) {
  const { data, status, error } = useQuery({
    queryKey: ["posts", domain],
    queryFn: () => getPosts(domain),
  });

  return (
    <div className="postList">
      {status === "pending" && "Loading..."}
      {error && <p>{error}</p>}
      {data &&
        data.map((post) => (
          <div className="post" key={post.id}>
            <div className="published">{post.isPublished}</div>
            <div className="post-title">{post.title}</div>
            <div className="post-text">{post.text}</div>
            <div className="post-created">{post.createdAt}</div>
            <div className="post-updated">{post.updatedAt}</div>
          </div>
        ))}
    </div>
  );
}

export default PostList;
