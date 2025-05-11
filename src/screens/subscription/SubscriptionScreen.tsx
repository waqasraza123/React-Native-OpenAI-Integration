import React, { useState } from 'react';
import { View, Text, ScrollView, Platform } from 'react-native';
import { subscriptionPlans } from '../../types/subscription';
import { PlanCard } from '../../components/subscription/PlanCard';
import { PrimaryButton } from '../../components/buttons/PrimaryButton';
import { supabase } from '../../lib/supabase';
import Toast from 'react-native-toast-message';

export default function SubscriptionScreen() {
    const [selectedPlan, setSelectedPlan] = useState(subscriptionPlans[0]);
    const [loading, setLoading] = useState(false);

    const handleSubscribe = async () => {
        try {
            setLoading(true);
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                throw new Error('Please login to subscribe');
            }

            const response = await fetch('/api/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    priceId: selectedPlan.priceId,
                    userId: user.id,
                }),
            });

            const { sessionUrl } = await response.json();

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
    };

    return (
        <View className="flex-1 bg-background">
            <ScrollView className="flex-1 px-4 pt-8">
                <View className="items-center mb-8">
                    <Text className="text-3xl font-bold text-gray-900">Choose Your Plan</Text>
                    <Text className="text-gray-500 text-center mt-2 max-w-sm">
                        Select the perfect plan for your needs. Upgrade or downgrade at any time.
                    </Text>
                </View>

                <View className="space-y-4">
                    {subscriptionPlans.map((plan) => (
                        <PlanCard
                            key={plan.id}
                            plan={plan}
                            isSelected={selectedPlan.id === plan.id}
                            onSelect={() => setSelectedPlan(plan)}
                        />
                    ))}
                </View>

                <View className="py-8">
                    <PrimaryButton
                        title={`Subscribe to ${selectedPlan.name}`}
                        onPress={handleSubscribe}
                        loading={loading}
                    />
                    <Text className="text-center text-gray-500 text-sm mt-4">
                        Prices shown are in USD. Subscription will automatically renew each month.
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
}