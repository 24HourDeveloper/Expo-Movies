import MovieList from './MovieList'
import usePagination from '../hooks/usePagination';
import MoviesContainer from './MoviesContainer';

function NowPlaying() {
  const { movies, page, setPage, refetch, loading } = usePagination("now_playing")

  if(movies === null) return null

  return (
    <MoviesContainer>
      <MovieList
        cols={2}
        movies={movies}
        loading={loading}
        fetchNextPage={() => {
          setPage(page +  1)
          refetch({page: page + 1})
        }}
      />
    </MoviesContainer>
  )
}

export default NowPlaying