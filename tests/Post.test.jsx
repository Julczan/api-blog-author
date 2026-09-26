import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { createMemoryRouter, RouterProvider } from "react-router";
import routes from "../src/routes";
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
  it("displays error when unauthenticated user tries to see a post", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/posts/4"],
    });
    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
    );

    const error = await screen.findByText(/AuthenticationError: Unauthorized/i);
    expect(error).toBeInTheDocument();
  });

  it("renders delete and edit buttons on each comment", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/posts/1"],
    });
    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
    );
    const editBtn = await screen.findAllByRole("button", { name: "Edit" });
    const deleteBtn = await screen.findAllByRole("button", { name: "Delete" });
    expect(editBtn).toHaveLength(2);
    expect(deleteBtn).toHaveLength(2);
  });

  it("renders form to add a post", () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/posts/add"],
    });
    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
    );
    const form = screen.getByRole("form");
    expect(form).toBeInTheDocument();
  });
});
