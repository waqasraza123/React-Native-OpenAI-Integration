import { useState, useCallback } from 'react';
import { Platform } from 'react-native';
import { createCheckoutSession } from '../services/stripe';
import Toast from 'react-native-toast-message';

export const useSubscription = () => {
  const [loading, setLoading] = useState(false);

  const handleSubscribe = useCallback(async (priceId: string) => {
    try {
      setLoading(true);
      const { sessionUrl } = await createCheckoutSession(priceId);

      if (Platform.OS === 'web') {
        window.location.href = sessionUrl;
      } else {
        // Handle mobile checkout flow
        // You might want to use a WebView or deep linking here
      }
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    handleSubscribe,
  };
};