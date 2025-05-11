import React from 'react'
import { TextInput as RNTextInput, TextInputProps, View, Text } from 'react-native'

interface InputFieldProps extends TextInputProps {
    className?: string
    label?: string
    error?: string
}

export const InputField = ({ className = '', label, error, ...props }: InputFieldProps) => {
    return (
        <View className="mb-4 w-full">
            {label && (
                <Text className="text-sm font-medium text-gray-700 mb-1.5">
                    {label}
                </Text>
            )}
            <RNTextInput
                placeholderTextColor="#94A3B8"
                className={`w-full px-4 py-3.5 rounded-xl border bg-white text-gray-900 text-base
                    ${error ? 'border-error' : 'border-border'}
                    focus:border-primary-500 focus:border-2
                    ${className}`}
                {...props}
            />
            {error && (
                <Text className="mt-1.5 text-sm text-error">
                    {error}
                </Text>
            )}
        </View>
    )
}