import React, { ReactNode } from 'react'
import { Pressable, Text, ActivityIndicator, View } from 'react-native'

interface PrimaryButtonProps {
    title: string
    onPress: () => void
    loading?: boolean
    disabled?: boolean
    icon?: ReactNode
    className?: string
}

export const PrimaryButton = ({
    title,
    onPress,
    loading = false,
    disabled = false,
    icon,
    className = '',
}: PrimaryButtonProps) => {
    return (
        <Pressable
            onPress={onPress}
            disabled={disabled || loading}
            className={`w-full py-3 px-4 rounded-lg items-center justify-center flex-row transition-opacity ${
                disabled ? 'bg-primary/60 opacity-70' : 'bg-primary'
            } ${className}`}
        >
            {loading ? (
                <ActivityIndicator color="#ffffff" />
            ) : (
                <>
                    {icon && <View className="mr-2">{icon}</View>}
                    <Text className="text-white font-semibold text-base">{title}</Text>
                </>
            )}
        </Pressable>
    )
}