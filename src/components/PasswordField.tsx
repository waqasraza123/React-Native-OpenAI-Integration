import React, { useState } from 'react'
import { TextInput as RNTextInput, TextInputProps } from 'react-native'

interface PasswordFieldProps extends TextInputProps {
    className?: string
}

export const PasswordField = ({ className = '', ...props }: PasswordFieldProps) => {
    const [secure, setSecure] = useState(true)

    return (
        <RNTextInput
            secureTextEntry={secure}
            placeholderTextColor="#8E8E93"
            className={`w-full px-4 py-3 mb-4 rounded-lg border border-border bg-white text-black text-base ${className}`}
            {...props}
        />
    )
}
