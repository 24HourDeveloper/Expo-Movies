import { useState, useEffect } from 'react';
import { TVS_QUERY } from '../gql/Query';
import { useQuery } from '@apollo/client';

interface TVShow {
  id: string;
  name: string;
  poster_path: string;
  overview: string;
  vote_average: number;
  season_number: number;
}

export const useTVList = () => {
  const [page, setPage] = useState<number>(1)
  const [shows, setShows] = useState<[] | TVShow[]>([])

  const { data, loading, refetch } = useQuery(TVS_QUERY, {
    variables: {
      page,
    }
  })

  const addMoreShows = () => {
    setShows((prevShows) => [...prevShows, ...data.tvs])
  }

  useEffect(() => {
    if(data && page === 1) {
      setShows(data.tvs)
    }
  }, [data])

  useEffect(() => {
    if(page !== 1 && !loading) {
      addMoreShows()
    }
  }, [page, loading])

  return {
    shows,
    page,
    loading,
    refetch,
    setPage,
  };
}; 