import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/author/posts", () => {
    return HttpResponse.json([
      {
        id: 1,
        title: "first post",
        text: "Its the first post - published",
        createdAt: "2026-08-27T19:13:28.303Z",
        updatedAt: "2026-08-27T19:13:28.303Z",
        published: true,
        authorId: 7,
        author: {
          id: 7,
          username: "Julczan",
        },
      },
      {
        id: 2,
        title: "second post",
        text: "Its the second post - unpublished",
        createdAt: "2026-08-27T19:13:28.303Z",
        updatedAt: "2026-08-27T19:13:28.303Z",
        published: false,
        authorId: 7,
        author: {
          id: 7,
          username: "Julczan",
        },
      },
    ]);
  }),

  http.post("/user/signup", () => {
    return HttpResponse.json(
      [{ msg: "Passwords do not match!" }, { msg: "Username already exists!" }],
      { status: 400 },
    );
  }),

  http.get("/author/posts/:postId", ({ params }) => {
    if (params.postId === "3") {
      return HttpResponse.json({ error: "Post not found" }, { status: 404 });
    }
    if (params.postId === "4") {
      return HttpResponse.json(
        { error: "AuthenticationError: Unauthorized" },
        { status: 401 },
      );
    }
    return HttpResponse.json({
      id: 1,
      title: "first post",
      text: "Its the first post",
      createdAt: "2026-08-27T19:13:28.303Z",
      updatedAt: "2026-08-27T19:13:28.303Z",
      authorId: 1,
      author: {
        username: "Julczan",
      },
    });
  }),
  http.get("/author/posts/:postId/comments", ({ params }) => {
    if (params.postId === "2") {
      return HttpResponse.json([]);
    }
    return HttpResponse.json([
      { id: 1, author: { username: "Julek" }, text: "comment" },
      { id: 2, author: { username: "Test" }, text: "Second comment" },
    ]);
  }),

  http.post("/user/login", () => {
    return HttpResponse.json(
      { msg: "Invalid username or password" },
      { status: 401 },
    );
  }),

  http.get("/author/posts/:postId/comments/:commentId", ({ params }) => {
    if (params.postId !== "1") {
      return HttpResponse.json({ error: "Comment not found" }, { status: 404 });
    }
    if (params.commentId !== "1") {
      return HttpResponse.json({ error: "Comment not found" }, { status: 404 });
    }
    return HttpResponse.json({
      id: 1,
      createdAt: "2026-08-28T20:06:28.730Z",
      updatedAt: "2026-08-28T20:06:28.730Z",
      author: {
        username: "Julek",
      },
      text: "comment",
    });
  }),
];
