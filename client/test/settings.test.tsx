import { describe, it, expect, beforeEach } from "bun:test";
import { Window } from "happy-dom";
import { render, fireEvent } from "@testing-library/react";
import Settings from "../src/pages/Settings";

// Mocking global window and document using happy-dom
const win = new Window();
globalThis.window = win as any;
globalThis.document = win.document as any;

// reset localStorage and document before each test
beforeEach(() => {
  localStorage.clear();
  document.documentElement.removeAttribute("data-theme");
  document.body.innerHTML = "";
});

describe("Settings component", () => {
  // Changing theme once
  it("applies theme on click and persists to localStorage", () => {
    const { container } = render(<Settings />);

    const btn = container.querySelector('[data-testid="cupcake-theme"]');
    expect(btn).not.toBeNull();

    fireEvent.click(btn!);

    expect(document.documentElement.getAttribute("data-theme")).toBe("cupcake");
    expect(localStorage.getItem("theme")).toBe("cupcake");
  });

  // Changing theme multiple times in a row
  it("changes theme multiple times and persists each change", () => {
    const { container } = render(<Settings />);

    const cupcakeBtn = container.querySelector(
      '[data-testid="cupcake-theme"]'
    ) as HTMLElement;
    expect(cupcakeBtn).not.toBeNull();
    fireEvent.click(cupcakeBtn);
    expect(document.documentElement.getAttribute("data-theme")).toBe("cupcake");
    expect(localStorage.getItem("theme")).toBe("cupcake");

    const darkBtn = container.querySelector(
      '[data-testid="dark-theme"]'
    ) as HTMLElement;
    fireEvent.click(darkBtn);
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    expect(localStorage.getItem("theme")).toBe("dark");

    const retroBtn = container.querySelector(
      '[data-testid="retro-theme"]'
    ) as HTMLElement;
    fireEvent.click(retroBtn);
    expect(document.documentElement.getAttribute("data-theme")).toBe("retro");
    expect(localStorage.getItem("theme")).toBe("retro");

    const cyberpunkBtn = container.querySelector(
      '[data-testid="cyberpunk-theme"]'
    ) as HTMLElement;
    fireEvent.click(cyberpunkBtn);
    expect(document.documentElement.getAttribute("data-theme")).toBe(
      "cyberpunk"
    );
    expect(localStorage.getItem("theme")).toBe("cyberpunk");

    const lightBtn = container.querySelector(
      '[data-testid="light-theme"]'
    ) as HTMLElement;
    fireEvent.click(lightBtn);
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
    expect(localStorage.getItem("theme")).toBe("light");

    const winterBtn = container.querySelector(
      '[data-testid="winter-theme"]'
    ) as HTMLElement;
    fireEvent.click(winterBtn);
    expect(document.documentElement.getAttribute("data-theme")).toBe("winter");
    expect(localStorage.getItem("theme")).toBe("winter");
  });
});
