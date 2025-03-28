import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoginPage from "./login";

const queryClientInstance = new QueryClient();

describe("Login Page", () => {
  it("should render the login page", () => {
    render(
      <QueryClientProvider client={queryClientInstance}>
        <LoginPage />
      </QueryClientProvider>
    );
    //getBy -> throws error if component not found
    // findBy -> for async components testing
    //queryBy ->  return null , if component not found
    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });
});
