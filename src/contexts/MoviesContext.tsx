import React, { createContext, useEffect, useState } from "react";
import { useContext } from "react";
import { api } from "../services/api";

interface Genre {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface Movie {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface MoviesContextType {
  genres: Genre[],
  movies: Movie[],
  selectedGenre: Genre,
  selectedGenreId: number,
  updateSelectedGenreId(id: number): void
}

const MoviesContext = createContext<MoviesContextType>({} as MoviesContextType);

export const MoviesContextProvider:React.FC = ({children}) => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<Genre>({} as Genre);
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  useEffect(() => {
    api.get<Movie[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });

    api.get<Genre>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);

  useEffect(() => {
    api.get<Genre[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  function updateSelectedGenreId(id: number) {
    setSelectedGenreId(id)
  }

  return (
    <MoviesContext.Provider
      value={{
        genres,
        selectedGenreId,
        movies,
        selectedGenre,
        updateSelectedGenreId
      }}
    >
      {children}
    </MoviesContext.Provider>
  )
}

export function useMoviesContext() {
  return useContext(MoviesContext)
}