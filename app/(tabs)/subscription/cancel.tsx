import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { PrimaryButton } from '../../../src/components/buttons/PrimaryButton';

export default function SubscriptionCancel() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-background px-4">
      <View className="bg-error/10 rounded-full p-6 mb-6">
        <Text className="text-6xl">😔</Text>
      </View>
      <Text className="text-2xl font-bold text-gray-900 text-center mb-2">
        Subscription Cancelled
      </Text>
      <Text className="text-gray-500 text-center mb-8">
        Your subscription was not completed. Please try again or contact support if you need assistance.
      </Text>
      <PrimaryButton
        title="Try Again"
        onPress={() => router.back()}
      />
    </View>
  );
}