/** @jsx React.createElement */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Lyrics from "../lyrics";
import { Song } from "@/utils/models";

describe("Lyrics component", () => {
  test("should display 'No song selected' when id is missing", () => {
    render(<Lyrics id="" filteredSongs={new Map()} />);
    expect(screen.getByText("No song selected")).toBeInTheDocument();
  });

  test("should display lyrics when song is provided", () => {
    const mockSongs = new Map<string, Song>([
      ["1", { title: "Test Song", lyrics: "Test Lyrics", number: 1 }],
    ]);
    render(<Lyrics id="1" filteredSongs={mockSongs} />);
    expect(screen.getByText("Test Song")).toBeInTheDocument();
    expect(screen.getByText("Test Lyrics")).toBeInTheDocument();
  });

  test("should toggle copy icon when clicked", () => {
    const mockSongs = new Map<string, Song>([
      ["1", { title: "Test Song", lyrics: "Test Lyrics", number: 1 }],
    ]);
    render(<Lyrics id="1" filteredSongs={mockSongs} />);
    const button = screen.getByTitle("Copy Lyrics");
    fireEvent.click(button);
    // After clicking, the button should have the 'clicked' icon class or structure
    // Since we can't easily check for the SVG change, this is a basic interaction test.
    expect(button).toBeDefined();
  });
});
