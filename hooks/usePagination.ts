import { useQuery } from '@apollo/client'
import { useState, useEffect } from 'react'
import { MOVIES_QUERY } from '../gql/Query'
import { Movie } from '../components/MovieList'

export default function usePagination() {
  const [page, setPage] = useState<number>(1)
  const [movies, setMovies] = useState<[] | Movie[]>([])
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null)
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null)

  const { data, loading, refetch } = useQuery(MOVIES_QUERY, {
    variables: {
      page,
      with_watch_provider: selectedProvider,
      with_genres: selectedGenre,
    }
  })

  const addMoreMovies = () => {
    setMovies((prevMovies) => [...prevMovies, ...data.movies])
  }

  useEffect(() => {
    if(data && page === 1) {
      setMovies(data.movies)
    }
  }, [data])

  useEffect(() => {
    if(page !== 1 && !loading) {
      addMoreMovies()
    }
  }, [page, loading])

  const handleFilterChange = (provider: string | null, genre: string | null) => {
    setSelectedProvider(provider)
    setSelectedGenre(genre)
    setPage(1)
    refetch({
      page: 1,
      with_watch_provider: provider,
      with_genres: genre,
    })
  }

  return {
    page,
    setPage,
    movies,
    refetch,
    loading,
    selectedProvider,
    selectedGenre,
    handleFilterChange
  }
}
