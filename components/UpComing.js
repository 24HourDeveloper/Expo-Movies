import React from 'react'
import { View } from 'react-native'
import MovieList from './MovieList'
import { useFetchMoviesByType } from '../hooks/useNowPlayingMovies'

function UpComing() {
  const movies = useFetchMoviesByType("upcoming")
  if(movies.length === 0) return null

  return (
    <View style={{flex: 1, paddingTop: 10, alignItems: 'center', backgroundColor: '#1B1212'}}>
      <MovieList movie={movies} cols={2} />
    </View>
  )
}

export default UpComing