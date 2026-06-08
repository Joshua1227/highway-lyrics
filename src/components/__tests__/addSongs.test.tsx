import React, { useState } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AddSongs from "../addSongs";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe("AddSongs component", () => {
  test("should render Add Songs button", () => {
    render(<AddSongs />);
    expect(screen.getByText("Add Song")).toBeInTheDocument();
  });
});
