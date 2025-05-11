import React from 'react'
import { View } from 'react-native'
import { InputField } from '../fields/InputField'
import { PasswordField } from '../PasswordField'
import { PrimaryButton } from '../buttons/PrimaryButton'

interface EmailLoginProps {
    email: string
    setEmail: (email: string) => void
    password: string
    setPassword: (password: string) => void
    onSubmit: () => void
    loading: boolean
}

export const EmailLogin = ({
    email,
    setEmail,
    password,
    setPassword,
    onSubmit,
    loading,
}: EmailLoginProps) => {
    return (
        <View>
            <InputField
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <PasswordField
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
            />
            <PrimaryButton
                title="Login with Email"
                onPress={onSubmit}
                loading={loading}
                disabled={!email || !password}
            />
        </View>
    )
}