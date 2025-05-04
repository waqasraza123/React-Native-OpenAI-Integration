import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import LoginScreen from './src/screens/auth/LoginScreen'
import { magic } from './src/lib/magic'

export default function App() {

  return (
    <SafeAreaProvider>
      <LoginScreen />
      <magic.Relayer />
    </SafeAreaProvider>
  )
}
