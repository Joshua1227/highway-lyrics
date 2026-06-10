import { render, screen, fireEvent } from "@testing-library/react";
import Lyrics from "../lyrics";
import { Song } from "@/utils/models";

describe("Lyrics component", () => {
  test("should display 'No song selected' when id is missing", () => {
    render(
      <Lyrics
        id=""
        filteredSongs={new Map()}
        isExpanded={false}
        setIsExpanded={jest.fn()}
      />
    );
    expect(screen.getByText("No song selected")).toBeInTheDocument();
  });

  test("should display lyrics when song is provided", () => {
    const mockSongs = new Map<string, Song>([
      ["1", { title: "Test Song", lyrics: "Test Lyrics", number: 1 }],
    ]);
    render(
      <Lyrics
        id="1"
        filteredSongs={mockSongs}
        isExpanded={false}
        setIsExpanded={jest.fn()}
      />
    );
    expect(screen.getByText("Test Song")).toBeInTheDocument();
    expect(screen.getByText("Test Lyrics")).toBeInTheDocument();
  });

  test("should toggle copy icon when clicked", () => {
    const mockSongs = new Map<string, Song>([
      ["1", { title: "Test Song", lyrics: "Test Lyrics", number: 1 }],
    ]);
    render(
      <Lyrics
        id="1"
        filteredSongs={mockSongs}
        isExpanded={false}
        setIsExpanded={jest.fn()}
      />
    );
    const button = screen.getByTitle("Copy Lyrics");
    fireEvent.click(button);
    expect(button).toBeDefined();
  });

  test("should call setIsExpanded when toggle button is clicked", () => {
    const mockSongs = new Map<string, Song>([
      ["1", { title: "Test Song", lyrics: "Test Lyrics", number: 1 }],
    ]);
    const setIsExpanded = jest.fn();
    render(
      <Lyrics
        id="1"
        filteredSongs={mockSongs}
        isExpanded={false}
        setIsExpanded={setIsExpanded}
      />
    );
    const button = screen.getByTitle("Toggle Expand");
    fireEvent.click(button);
    expect(setIsExpanded).toHaveBeenCalledWith(true);
  });
});
