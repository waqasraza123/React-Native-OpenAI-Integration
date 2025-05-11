import React, { ReactNode } from 'react'
import { Pressable, Text, ActivityIndicator, View } from 'react-native'

interface PrimaryButtonProps {
    title: string
    onPress: () => void
    loading?: boolean
    disabled?: boolean
    icon?: ReactNode
    className?: string
    variant?: 'solid' | 'outline' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
}

export const PrimaryButton = ({
    title,
    onPress,
    loading = false,
    disabled = false,
    icon,
    className = '',
    variant = 'solid',
    size = 'md',
}: PrimaryButtonProps) => {
    const getVariantStyles = () => {
        switch (variant) {
            case 'outline':
                return 'bg-transparent border-2 border-primary-500'
            case 'ghost':
                return 'bg-transparent'
            default:
                return 'bg-primary-500 shadow-sm shadow-primary-500/30'
        }
    }

    const getSizeStyles = () => {
        switch (size) {
            case 'sm':
                return 'py-2 px-3'
            case 'lg':
                return 'py-4 px-6'
            default:
                return 'py-3.5 px-5'
        }
    }

    const getTextColor = () => {
        switch (variant) {
            case 'outline':
            case 'ghost':
                return 'text-primary-500'
            default:
                return 'text-white'
        }
    }

    return (
        <Pressable
            onPress={onPress}
            disabled={disabled || loading}
            className={`
                w-full rounded-xl items-center justify-center flex-row
                ${getVariantStyles()}
                ${getSizeStyles()}
                ${disabled ? 'opacity-50' : 'active:opacity-90'}
                ${className}
            `}
        >
            {loading ? (
                <ActivityIndicator color={variant === 'solid' ? '#ffffff' : '#6366F1'} />
            ) : (
                <>
                    {icon && <View className="mr-2">{icon}</View>}
                    <Text className={`font-semibold text-base ${getTextColor()}`}>
                        {title}
                    </Text>
                </>
            )}
        </Pressable>
    )
}