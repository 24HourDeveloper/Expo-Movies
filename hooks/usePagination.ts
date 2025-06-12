import { DocumentNode, useLazyQuery, useQuery } from '@apollo/client'
import { useFocusEffect } from 'expo-router'
import { useState, useEffect, useCallback } from 'react'
import { EntitiesItem } from '../components/List'

export default function usePagination(query: DocumentNode, type: string) {
  const [page, setPage] = useState<number>(1)
  const [items, setItems] = useState<[] | EntitiesItem[]>([])
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null)
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null)

  const {data, loading, error, refetch} = useQuery(query, {
    variables: {
      page,
      type,
      with_watch_provider: selectedProvider,
      with_genres: selectedGenre,
    },
    fetchPolicy: 'no-cache'
  })

  // useFocusEffect(
  //   useCallback(() => {
  //     loadList()
  //   }, [])
  // )

  const addMoreItems = () => {
    if (data?.list) {
      setItems((prevItems) => [...prevItems, ...data.list])
    }
  }

  useEffect(() => {
    if (data?.list && page === 1) {
      setItems(data.list)
    }
  }, [data, page])

  useEffect(() => {
    if (page !== 1 && !loading && data?.list) {
      addMoreItems()
    }
  }, [page, loading, data])

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
    items,
    refetch,
    loading,
    error,
    selectedProvider,
    selectedGenre,
    handleFilterChange
  }
}
