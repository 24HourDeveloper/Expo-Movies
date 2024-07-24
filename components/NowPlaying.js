import React from 'react'
import { View } from 'react-native'
import MovieList from './MovieList'
import { useMoviesByType } from '../hooks/useMoviesByType'

function NowPlaying() {
  const movies = useMoviesByType("now_playing")
  if(movies.length === 0) return null

  return (
    <View style={{flex: 1, paddingTop: 10, alignItems: 'center', backgroundColor: '#1B1212'}}>
      <MovieList movie={movies} cols={2} />
    </View>
  )
}

export default NowPlaying