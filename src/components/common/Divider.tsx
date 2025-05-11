import React from 'react'
import { View, Text } from 'react-native'

export const Divider = () => {
    return (
        <View className="flex-row items-center my-6">
            <View className="flex-1 h-px bg-gray-300" />
            <Text className="mx-3 text-gray-400 text-sm">or</Text>
            <View className="flex-1 h-px bg-gray-300" />
        </View>
    )
}