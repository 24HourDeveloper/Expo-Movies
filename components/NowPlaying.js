import React from 'react'
import { View } from 'react-native'
import { useQuery } from '@apollo/client';
import MovieList from './MovieList'
import { CATEGORY_MOVIES_QUERY } from '../gql/Query';

function NowPlaying() {
  const { data } = useQuery(CATEGORY_MOVIES_QUERY, { variables: { page: 1, category: "now_playing"}})

  if(data === undefined) return null

  return (
    <View style={{flex: 1, paddingTop: 10, alignItems: 'center', backgroundColor: '#1B1212'}}>
      <MovieList movie={data?.movies} cols={2} />
    </View>
  )
}

export default NowPlaying