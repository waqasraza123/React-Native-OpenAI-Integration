import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import LoginScreen from './src/screens/auth/LoginScreen'
import SignUpScreen from './src/screens/auth/SignUpScreen'
import './src/styles/global.css';
import Toast from 'react-native-toast-message'

const Stack = createNativeStackNavigator<any>()

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="Subscription" component={require('./src/screens/subscription/SubscriptionScreen').default} />
        </Stack.Navigator>
        <Toast />
      </NavigationContainer>
    </SafeAreaProvider>
  )
}