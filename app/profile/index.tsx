import React from "react";
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { View, Text } from 'react-native'
import SigninScreen from "../(auth)/sign-in";

export default function Profile() {
  return (
    <View>
        <SignedIn>
            <Text>Profile</Text>
        </SignedIn>
        <SignedOut>
            <SigninScreen />
        </SignedOut>
    </View>
  )
}
