import MovieList from './MovieList'
import MoviesContainer from './MoviesContainer';
import usePagination from '../hooks/usePagination';

function UpComing() {
  const { movies, page, setPage, refetch, loading } = usePagination("upcoming")

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

export default UpComing