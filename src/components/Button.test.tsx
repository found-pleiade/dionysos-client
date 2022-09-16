import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { expect, describe, it } from "vitest";
import Button from "./Button";

describe("Renders", () => {
  it("basic", () => {
    render(<Button>Hello World</Button>);

    expect(screen.getByText("Hello World").tagName).toBe("BUTTON");
    expect(
      screen.getByRole("button").classList.contains("text-light-accent-400")
    ).toBe(true);
  });

  it("disabled", () => {
    render(<Button disabled>Hello World</Button>);

    expect(screen.getByRole("button").hasAttribute("disabled")).toBe(true);
    expect(
      screen.getByRole("button").classList.contains("cursor-not-allowed")
    ).toBe(true);
  });

  it("colorless", () => {
    render(<Button colorless>Hello World</Button>);

    expect(
      screen.getByRole("button").classList.contains("!text-light-secondary-900")
    ).toBe(true);
  });
});

describe("Events", () => {
  it("click", () => {
    let clicked = false;
    const onClick = () => {
      clicked = true;
    };

    render(<Button onClick={onClick}>Hello World</Button>);

    screen.getByText("Hello World").click();
    expect(clicked).toBe(true);
  });
});
