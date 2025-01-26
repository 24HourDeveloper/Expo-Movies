import { View } from 'react-native'

type MoviesContainerTypes = {
  children: React.ReactNode
}

export default function MoviesContainer({ children }: MoviesContainerTypes) {
  return (
    <View style={{flex: 1, paddingTop: 10, alignItems: 'center', backgroundColor: '#1B1212'}}>
      { children }
    </View>
  )
}
