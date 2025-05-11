import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Check } from 'lucide-react-native';
import { SubscriptionPlan } from '../../types/subscription';

interface PlanCardProps {
    plan: SubscriptionPlan;
    isSelected: boolean;
    onSelect: () => void;
}

export const PlanCard: React.FC<PlanCardProps> = ({ plan, isSelected, onSelect }) => {
    return (
        <Pressable
            onPress={onSelect}
            className={`p-6 rounded-2xl shadow-lg mb-4 ${
                isSelected 
                    ? 'bg-primary/5 border-2 border-primary' 
                    : 'bg-white border border-gray-200'
            }`}
        >
            <View className="flex-row justify-between items-center mb-4">
                <View>
                    <Text className="text-2xl font-bold text-gray-900">{plan.name}</Text>
                    <Text className="text-gray-500 mt-1">
                        ${plan.price}/month
                    </Text>
                </View>
                {isSelected && (
                    <View className="bg-primary rounded-full p-2">
                        <Check size={20} color="white" />
                    </View>
                )}
            </View>

            <View className="space-y-3">
                {plan.features.map((feature) => (
                    <View key={feature.id} className="flex-row items-start space-x-3">
                        <View className="w-5 h-5 rounded-full bg-primary/10 items-center justify-center mt-1">
                            <Check size={12} color="#34C759" />
                        </View>
                        <View className="flex-1">
                            <Text className="text-gray-900 font-medium">{feature.name}</Text>
                            <Text className="text-gray-500 text-sm mt-0.5">{feature.description}</Text>
                        </View>
                    </View>
                ))}
            </View>
        </Pressable>
    );
};