import { describe, it, expect } from "vitest";
import { createMemoryRouter, RouterProvider } from "react-router";
import routes from "../src/routes";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

describe("Login", () => {
  it("renders signup form", () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/login"],
    });
    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
    );
    const form = screen.getByRole("form");
    expect(form).toBeInTheDocument();
  });

  it("displays errors on failed login", async () => {
    const user = userEvent.setup();
    const router = createMemoryRouter(routes, {
      initialEntries: ["/login"],
    });
    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
    );

    const usernameInput = screen.getByLabelText("Username");
    const passwordInput = screen.getByLabelText("Password");

    fireEvent.change(usernameInput, { target: { value: "julczan" } });
    fireEvent.change(passwordInput, { target: { value: "222" } });

    const button = screen.getByRole("button", { name: "Log In" });

    await user.click(button);

    const error = await screen.findByText(/Invalid username or password/i);
    expect(error).toBeInTheDocument();
  });
});
