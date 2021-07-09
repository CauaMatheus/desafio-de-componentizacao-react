import { useMoviesContext } from "../contexts/MoviesContext";
import { Button } from "./Button";

export function SideBar() {
  // Complete aqui
  const {
    genres,
    updateSelectedGenreId,
    selectedGenreId
  } = useMoviesContext()

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => updateSelectedGenreId(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>

    </nav>
  )
}