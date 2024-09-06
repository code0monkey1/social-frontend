import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import LoginPage from "./login";
describe("Login Page", () => {
  it("should render the login page", () => {
    render(<LoginPage />);
    //getBy -> throws error if component not found
    // findBy -> for async components testing
    //queryBy ->  return null , if component not found
    expect(screen.getByText(/Login Page/)).toBeInTheDocument();
  });
});
