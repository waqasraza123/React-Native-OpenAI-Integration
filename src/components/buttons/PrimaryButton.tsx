import React from 'react'
import { Pressable, Text, ActivityIndicator } from 'react-native'

interface PrimaryButtonProps {
    title: string
    onPress: () => void
    loading?: boolean
    disabled?: boolean
}

export const PrimaryButton = ({
    title,
    onPress,
    loading = false,
    disabled = false,
}: PrimaryButtonProps) => {
    return (
        <Pressable
            onPress={onPress}
            disabled={disabled}
            className={`w-full mt-3 py-3 rounded-lg items-center justify-center transition-opacity ${disabled ? 'bg-primary/60 opacity-70' : 'bg-primary'
                }`}
        >
            {loading ? (
                <ActivityIndicator color="#ffffff" />
            ) : (
                <Text className="text-white font-semibold text-base">{title}</Text>
            )}
        </Pressable>
    )
}
