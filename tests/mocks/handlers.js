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
        authorId: 1,
      },
      {
        id: 2,
        title: "second post",
        text: "Its the second post - unpublished",
        createdAt: "2026-08-27T19:13:28.303Z",
        updatedAt: "2026-08-27T19:13:28.303Z",
        published: false,
        authorId: 1,
      },
    ]);
  }),

  http.post("/user/signup", () => {
    return HttpResponse.json(
      [{ msg: "Passwords do not match!" }, { msg: "Username already exists!" }],
      { status: 400 },
    );
  }),
];
