import React from 'react'
import { TamaguiProvider } from 'tamagui'
import { config } from './tamagui.config'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import LoginScreen from './src/screens/auth/LoginScreen'
import { magic } from './src/lib/magic'

export default function App() {
  return (
    <SafeAreaProvider>
      <TamaguiProvider config={config}>
        <LoginScreen />
        <magic.Relayer />
      </TamaguiProvider>
    </SafeAreaProvider>
  )
}
