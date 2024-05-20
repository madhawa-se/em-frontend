interface Song {
    id: number;
    title: string;
    singer: string;
    album: string;
    genres: string[]; // Array of strings
    performers: number[]; // Array of numbers (assuming performer IDs)
  }