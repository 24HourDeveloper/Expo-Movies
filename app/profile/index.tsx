import React from "react";
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { View, Text, FlatList } from 'react-native'
import SigninScreen from "../(auth)/sign-in";
import MovieItem from "../../components/MovieItem";

export default function Profile() {
  const {user}  = useUser()
  return (
    <View style={{ backgroundColor: '#1B1212', flex: 1 }}>
        <SignedIn>
            <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 10, gap: 10 }}>
              <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 10 }}>
                <View style={{ height: 100, width: 100, backgroundColor: 'black', borderRadius: '50%' }} />
                <Text style={{ fontSize: 16, color: 'white' }}>{user?.emailAddresses[0].emailAddress}</Text>
              </View>
              <View style={{borderBottomColor: 'white', width: '100%', borderBottomWidth: 1 }} />
              <Text style={{ fontSize: 16, color: 'white' }}>Liked Movies</Text>
              <FlatList
                data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                renderItem={({ item }) => (
                  <MovieItem
                    itemID={item}
                    itemImage={"https://image.tmdb.org/t/p/w500/6Wdl9N6dL0Hi0T1qJLWSz6gMLbd.jpg"}
                  />
                )}
                keyExtractor={item => item.toString()}
                numColumns={2}
              />
            </View>
        </SignedIn>
        <SignedOut>
            <SigninScreen />
        </SignedOut>
    </View>
  )
}
