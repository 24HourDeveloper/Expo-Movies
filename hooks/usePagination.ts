import { useQuery } from '@apollo/client'
import { useState, useEffect } from 'react'
import { CATEGORY_MOVIES_QUERY } from '../gql/Query'
import { Movie } from '../components/MovieList'

export default function usePagination(category: string) {
  const [page, setPage] = useState<number>(1)
  const [movies, setMovies] = useState<[] | Movie[]>([])
  const { data, loading, refetch } = useQuery(CATEGORY_MOVIES_QUERY,
    { variables: { page, category }}
  )

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

  return {page, setPage, movies, refetch, loading}
}
