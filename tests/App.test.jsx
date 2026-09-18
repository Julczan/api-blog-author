import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import routes from "../src/routes";
import { createMemoryRouter, RouterProvider } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

describe("App component", () => {
  it("renders list of posts", async () => {
    const router = createMemoryRouter(routes);
    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
    );

    const firstPost = await screen.findByText(
      /Its the first post - published/i,
    );
    const secondPost = await screen.findByText(
      /Its the second post - unpublished/i,
    );

    expect(firstPost).toBeInTheDocument();
    expect(secondPost).toBeInTheDocument();
  });

  it("renders a navbar where user can sign up or login", async () => {
    const router = createMemoryRouter(routes);
    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
    );
    const login = await screen.findByText(/Login/i);
    expect(login).toBeInTheDocument();
  });

  it("renders button to publish/unpublish post when user is post author", async () => {
    localStorage.setItem("User", "Julczan");
    const router = createMemoryRouter(routes);
    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
    );

    const firstBtn = await screen.findByRole("button", { name: "Publish" });
    const secondBtn = await screen.findByRole("button", { name: "Unpublish" });

    expect(firstBtn).toBeInTheDocument();
    expect(secondBtn).toBeInTheDocument();
  });

  it("does not render button to publish/unpublish post when user is not post author", async () => {
    localStorage.setItem("User", "Test");
    const router = createMemoryRouter(routes);
    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
    );

    const firstBtn = screen.queryByRole("button", { name: "Publish" });
    const secondBtn = screen.queryByRole("button", { name: "Unpublish" });

    expect(firstBtn).not.toBeInTheDocument();
    expect(secondBtn).not.toBeInTheDocument();
  });
});
