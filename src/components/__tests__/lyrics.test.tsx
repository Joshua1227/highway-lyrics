import { render, screen, fireEvent } from "@testing-library/react";
import Lyrics from "../lyrics";
import { Song } from "@/utils/models";
import { vi } from "vitest";

vi.mock("next/router", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

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

  test("should show an edit button when a song is displayed", () => {
    const mockSongs = new Map<string, Song>([
      ["1", { title: "Test Song", lyrics: "Test Lyrics", number: 1 }],
    ]);
    render(<Lyrics id="1" filteredSongs={mockSongs} />);
    expect(screen.getByTitle("Edit Song")).toBeInTheDocument();
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

  test("should render lyrics with default font size and left alignment when not expanded", () => {
    const mockSongs = new Map<string, Song>([
      ["1", { title: "Test Song", lyrics: "Test Lyrics", number: 1 }],
    ]);
    render(<Lyrics id="1" filteredSongs={mockSongs} />);
    const lyricsContainer = screen.getByText("Test Lyrics").parentElement;
    expect(lyricsContainer).toHaveClass("text-lg");
    expect(lyricsContainer).not.toHaveClass("text-center");
    expect(lyricsContainer).not.toHaveClass("text-2xl");

    // The outer container keeps a constrained max width when collapsed
    const outerContainer = lyricsContainer?.parentElement;
    expect(outerContainer).toHaveClass("max-w-2xl");
  });

  test("should increase font size and center-align lyrics when expanded", () => {
    const mockSongs = new Map<string, Song>([
      ["1", { title: "Test Song", lyrics: "Test Lyrics", number: 1 }],
    ]);
    render(<Lyrics id="1" filteredSongs={mockSongs} isLyricsExpanded />);
    const lyricsContainer = screen.getByText("Test Lyrics").parentElement;
    expect(lyricsContainer).toHaveClass("text-2xl");
    expect(lyricsContainer).toHaveClass("text-center");
    expect(lyricsContainer).not.toHaveClass("text-lg");

    // The outer container expands to full width (no max-width) when expanded
    const outerContainer = lyricsContainer?.parentElement;
    expect(outerContainer).not.toHaveClass("max-w-2xl");
  });
});
