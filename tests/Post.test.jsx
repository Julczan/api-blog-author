import { describe, it, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import { createMemoryRouter, RouterProvider } from "react-router";
import routes from "../src/routes";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

describe("Post page", () => {
  it("renders a single post with comments", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/posts/1"],
    });
    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
    );
    const post = await screen.findByText("Its the first post");
    const firstComment = await screen.findByText("comment");
    const authorUsername = await screen.findByText("Julek");
    const secondAuthor = await screen.findByText("Test");
    expect(post).toBeInTheDocument();
    expect(firstComment).toBeInTheDocument();
    expect(authorUsername).toBeInTheDocument();
    expect(secondAuthor).toBeInTheDocument();
  });
  it("renders an error page when the post is not found", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/posts/3"],
    });
    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
    );
    const error = await screen.findByText(/Post not found/i);
    expect(error).toBeInTheDocument();
  });
  it("renders 'no comments yet' message when there are no comments", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/posts/2"],
    });
    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
    );
    const post = await screen.findByText("Its the first post");
    const error = await screen.findByText(/No comments yet/i);
    expect(post).toBeInTheDocument();
    expect(error).toBeInTheDocument();
  });
  it("renders 'home' button", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/posts/2"],
    });
    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
    );
    const button = await screen.findByRole("link", { name: "Home" });
    expect(button).toBeInTheDocument();
  });
  it("renders 'leave a comment' section", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/posts/2"],
    });
    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
    );
    const comment = await screen.findByRole("form");
    expect(comment).toBeInTheDocument();
  });
  // it("displays error when unauthenticated user tries to comment a post", async () => {
  //   const user = userEvent.setup();
  //   const router = createMemoryRouter(routes, {
  //     initialEntries: ["/posts/2"],
  //   });
  //   render(
  //     <QueryClientProvider client={queryClient}>
  //       <RouterProvider router={router} />
  //     </QueryClientProvider>,
  //   );
  //   const commentInput = await screen.findByLabelText("Comment");
  //   fireEvent.change(commentInput, { target: { value: "test" } });
  //   const submitBtn = await screen.findByRole("button", { name: "Comment" });
  //   await user.click(submitBtn);
  //   const error = await screen.findByText(/AuthenticationError: Unauthorized/i);
  //   expect(error).toBeInTheDocument();
  // });
  // it("renders delete and edit buttons when user is comment author", async () => {
  //   localStorage.setItem("User", "Julek");
  //   const router = createMemoryRouter(routes, {
  //     initialEntries: ["/posts/1"],
  //   });
  //   render(
  //     <QueryClientProvider client={queryClient}>
  //       <RouterProvider router={router} />
  //     </QueryClientProvider>,
  //   );
  //   const editBtn = await screen.findByRole("button", { name: "Edit" });
  //   const deleteBtn = await screen.findByRole("button", { name: "Delete" });
  //   expect(editBtn).toBeInTheDocument();
  //   expect(deleteBtn).toBeInTheDocument();
  // });
  // it("does not render delete and edit buttons when user is not comment author", async () => {
  //   localStorage.setItem("User", "Someone");
  //   const router = createMemoryRouter(routes, {
  //     initialEntries: ["/posts/1"],
  //   });
  //   render(
  //     <QueryClientProvider client={queryClient}>
  //       <RouterProvider router={router} />
  //     </QueryClientProvider>,
  //   );
  //   const editBtn = screen.queryByRole("button", { name: "Edit" });
  //   const deleteBtn = screen.queryByRole("button", { name: "Delete" });
  //   expect(editBtn).not.toBeInTheDocument();
  //   expect(deleteBtn).not.toBeInTheDocument();
  // });
});
