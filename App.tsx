import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Send, CreditCard, User } from 'lucide-react-native';
import Toast from 'react-native-toast-message';
import ChatScreen from './src/screens/chat/ChatScreen';
import SubscriptionScreen from './src/screens/subscription/SubscriptionScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Chat"
          screenOptions={{
            headerShown: false,
            tabBarStyle: {
              backgroundColor: '#ffffff',
              borderTopWidth: 1,
              borderTopColor: '#E2E8F0',
              height: Platform.OS === 'ios' ? 88 : 60,
              paddingBottom: Platform.OS === 'ios' ? 28 : 8,
              paddingTop: 8,
              elevation: 8,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: -2,
              },
              shadowOpacity: 0.1,
              shadowRadius: 3,
            },
            tabBarActiveTintColor: '#6366F1',
            tabBarInactiveTintColor: '#64748B',
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: '500',
              marginTop: 4,
            },
          }}
        >
          <Tab.Screen
            name="Chat"
            component={ChatScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <Send size={24} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Subscription"
            component={SubscriptionScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <CreditCard size={24} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <User size={24} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
        <Toast />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}