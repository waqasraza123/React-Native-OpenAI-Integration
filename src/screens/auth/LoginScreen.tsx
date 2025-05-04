import React, { useState } from 'react'
import { Button, Input, Stack, Text, View } from 'tamagui'
import { magic } from '../../lib/magic'

export default function LoginScreen() {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleLogin = async () => {
        try {
            setLoading(true)
            setError(null)
            await magic.auth.loginWithEmailOTP({ email })
            alert('Check your email for the login link!')
        } catch (err: any) {
            setError('Login failed. Please try again.')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Stack flex={1} alignItems="center" justifyContent="center" backgroundColor="$bg">
            <Text fontWeight="bold">Magic Link Login</Text>
            <Input
                width={280}
                placeholder="you@example.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <Button theme="light" onPress={handleLogin} disabled={loading || !email}>
                {loading ? 'Sending...' : 'Send Magic Link'}
            </Button>
            {error && <Text color="red">{error}</Text>}
        </Stack>
    )
}
