import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView, StatusBar, StyleSheet, Platform } from 'react-native';
import { MainLayout } from './src/components/layouts/MainLayout';
import ProfileScreen from './src/screens/profile/ProfileScreen';
import ChatScreen from './src/screens/chat/ChatScreen';
import LoginScreen from './src/screens/auth/LoginScreen';
import SignUpScreen from './src/screens/auth/SignUpScreen';
import './src/styles/global.css';
import SubscriptionScreen from './src/screens/subscription/SubscriptionScreen';
import StartupScreen from './src/StartupScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="StartupScreen"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="StartupScreen" component={StartupScreen} />
          <Stack.Screen
            name="ChatScreen"
            component={(props: any) => (
              <MainLayout>
                <ChatScreen {...props} />
              </MainLayout>
            )}
          />
          <Stack.Screen
            name="SubscriptionScreen"
            component={(props: any) => (
              <MainLayout>
                <SubscriptionScreen {...props} />
              </MainLayout>
            )}
          />
          <Stack.Screen
            name="ProfileScreen"
            component={(props: any) => (
              <MainLayout>
                <ProfileScreen {...props} />
              </MainLayout>
            )}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    ...Platform.select({
      ios: {
        paddingTop: 20,
      },
      android: {
        paddingTop: StatusBar.currentHeight,
      },
    }),
  },
});

export default App;