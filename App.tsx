import { useEffect } from 'react';
import { View } from 'react-native';
import { SplashScreen } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function App() {
  useEffect(() => {
    // Hide splash screen after the app is ready
    SplashScreen.hideAsync();
  }, []);

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1 }}>
        <Toast />
      </View>
    </SafeAreaProvider>
  );
}