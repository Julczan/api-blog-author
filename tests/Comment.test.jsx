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

describe("Comment page", () => {
  it("renders a comment with username and timestamp", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/posts/1/comments/1"],
    });
    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
    );
    const comment = await screen.findByText("comment");
    const authorUsername = await screen.findByText("Julek");

    expect(comment).toBeInTheDocument();
    expect(authorUsername).toBeInTheDocument();
  });

  it("renders 'comment not found' message when post or comment missing", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/posts/1/comments/2"],
    });
    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
    );
    const error = await screen.findByText(/comment not found/i);

    expect(error).toBeInTheDocument();
  });
});
