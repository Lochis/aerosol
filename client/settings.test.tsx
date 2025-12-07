/// <reference lib="dom" />
import { describe, it, beforeEach, expect } from "bun:test";
import { render, screen, fireEvent } from "@testing-library/react";
import Settings from "./src/pages/Settings";

beforeEach(() => {
  localStorage.clear();
  document.documentElement.removeAttribute("data-theme");
});

describe("Settings component (bun)", () => {
  it("applies theme on click and persists to localStorage", () => {
    render(<Settings />);
    const btn = screen.getByRole("button", { name: /cupcake/i });
    fireEvent.click(btn);
    expect(document.documentElement.getAttribute("data-theme")).toBe("cupcake");
    expect(localStorage.getItem("theme")).toBe("cupcake");
  });
});