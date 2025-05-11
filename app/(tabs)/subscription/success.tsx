import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { supabase } from '../../../src/lib/supabase';

export default function SubscriptionSuccess() {
  const { session_id } = useLocalSearchParams();
  const router = useRouter();

  useEffect(() => {
    const updateSubscriptionStatus = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          // Update user's subscription status in your database
          await supabase
            .from('profiles')
            .update({ subscription_status: 'active', session_id })
            .eq('id', user.id);
        }
        
        // Redirect to home after 5 seconds
        setTimeout(() => {
          router.replace('/');
        }, 5000);
      } catch (error) {
        console.error('Error updating subscription status:', error);
      }
    };

    if (session_id) {
      updateSubscriptionStatus();
    }
  }, [session_id]);

  return (
    <View className="flex-1 items-center justify-center bg-background px-4">
      <View className="bg-success/10 rounded-full p-6 mb-6">
        <Text className="text-6xl">🎉</Text>
      </View>
      <Text className="text-2xl font-bold text-gray-900 text-center mb-2">
        Thank you for subscribing!
      </Text>
      <Text className="text-gray-500 text-center">
        Your subscription has been activated successfully. You will be redirected shortly.
      </Text>
    </View>
  );
}