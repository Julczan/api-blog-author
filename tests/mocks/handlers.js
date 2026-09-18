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
      return HttpResponse.json({ message: "Post not found" }, { status: 404 });
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
];
