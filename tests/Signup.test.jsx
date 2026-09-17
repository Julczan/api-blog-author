import { describe, it, expect } from "vitest";
import { createMemoryRouter, RouterProvider } from "react-router";
import routes from "../src/routes";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

describe("Signup", () => {
  it("renders signup form", () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/signup"],
    });
    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
    );

    const form = screen.getByRole("form");
    expect(form).toBeInTheDocument();
  });

  it("displays errors when signup fails", async () => {
    const user = userEvent.setup();
    const router = createMemoryRouter(routes, {
      initialEntries: ["/signup"],
    });
    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
    );

    const usernameInput = screen.getByLabelText("Username");
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const confirmPasswordInput = screen.getByLabelText("Confirm Password");

    fireEvent.change(usernameInput, { target: { value: "julczan" } });
    fireEvent.change(emailInput, { target: { value: "julczan@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "123123" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "1231234" } });

    const button = screen.getByRole("button", { name: "Sign Up" });

    await user.click(button);

    const usernameError = await screen.findByText(/Username already exists!/i);
    const passwordError = await screen.findByText(/Passwords do not match!/i);
    expect(usernameError).toBeInTheDocument();
    expect(passwordError).toBeInTheDocument();
  });
});
