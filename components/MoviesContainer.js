import { View } from 'react-native'

export default function MoviesContainer({ children }) {
  return (
    <View style={{flex: 1, paddingTop: 10, alignItems: 'center', backgroundColor: '#1B1212'}}>
      { children }
    </View>
  )
}
