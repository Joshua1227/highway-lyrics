import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Lyrics from "./lyrics";
import { Song } from "@/utils/models";

function getSongsMap(songs: { [id: string]: Song }) {
  return new Map(Object.entries(songs));
}

describe("Lyrics component", () => {
  it("renders 'No song selected' when id is empty", () => {
    render(<Lyrics id="" filteredSongs={getSongsMap({})} />);
    expect(screen.getByText(/no song selected/i)).toBeInTheDocument();
  });

  it("renders 'Loading lyrics...' when lyrics are missing", () => {
    const songs = getSongsMap({
      "1": { title: "Test Song", lyrics: "", number: 1 },
    });
    render(<Lyrics id="1" filteredSongs={songs} />);
    expect(screen.getByText(/loading lyrics/i)).toBeInTheDocument();
  });

  it("renders song title and lyrics", () => {
    const songs = getSongsMap({
      "1": { title: "Test Song", lyrics: "Line 1\nLine 2", number: 1 },
    });
    render(<Lyrics id="1" filteredSongs={songs} />);
    expect(screen.getByText(/test song/i)).toBeInTheDocument();
    expect(screen.getByText(/line 1/i)).toBeInTheDocument();
    expect(screen.getByText(/line 2/i)).toBeInTheDocument();
  });

  it("copies lyrics to clipboard when copy button is clicked", async () => {
    const songs = getSongsMap({
      "1": { title: "Test Song", lyrics: "Line 1\nLine 2", number: 1 },
    });
    Object.assign(navigator, {
      clipboard: { writeText: jest.fn().mockResolvedValue(undefined) },
    });
    render(<Lyrics id="1" filteredSongs={songs} />);
    const button = screen.getByTitle(/copy lyrics/i);
    fireEvent.click(button);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      expect.stringContaining("Test Song")
    );
  });
});
