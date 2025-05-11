import React from 'react'
import { View, Text } from 'react-native'

interface ErrorMessageProps {
    message: string
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
    return message ? (
        <View className="bg-error/10 border border-error rounded-md mt-4 p-2">
            <Text className="text-error text-sm text-center">{message}</Text>
        </View>
    ) : null
}