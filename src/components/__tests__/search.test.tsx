import { render, screen, fireEvent } from "@testing-library/react";
import Search from "../search";
import { Song } from "@/utils/models";

describe("Search component", () => {
  const mockAllSongs = new Map<string, Song>([
    ["1", { title: "Song A", lyrics: "Lyrics A", number: 1 }],
    ["2", { title: "Song B", lyrics: "Lyrics B", number: 2 }],
  ]);

  test("should render search input", () => {
    render(<Search setFilteredSongs={jest.fn()} allSongs={mockAllSongs} />);
    expect(screen.getByPlaceholderText("Search Songs")).toBeInTheDocument();
  });

  test("should update search query on input change", () => {
    render(<Search setFilteredSongs={jest.fn()} allSongs={mockAllSongs} />);
    const input = screen.getByPlaceholderText("Search Songs") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "Song A" } });
    expect(input.value).toBe("Song A");
  });
});
