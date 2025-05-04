import React, { useState } from 'react'
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native'
import { magic } from '../../lib/magic'
import { styles } from './LoginScreen.styles'
import { Alert } from 'react-native'

export default function LoginScreen() {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleLogin = async () => {
        try {
            setLoading(true)
            setError(null)
            await magic.auth.loginWithEmailOTP({ email })
            Alert.alert(
                'Successfully Authenticated',
                'You can continue using the app.',
                [{ text: 'OK' }]
            )
        } catch (err: any) {
            setError('Login failed. Please try again.')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const handleEmailChange = (newEmail: string) => {
        setEmail(newEmail)
    }

    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <Text style={styles.title}>Magic Link Login</Text>

                <TextInput
                    style={styles.input}
                    placeholder="you@example.com"
                    value={email}
                    onChangeText={handleEmailChange}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <TouchableOpacity
                    style={[styles.button, (loading || !email) && styles.buttonDisabled]}
                    onPress={handleLogin}
                    disabled={loading || !email}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>Send Magic Link</Text>
                    )}
                </TouchableOpacity>

                {error && <Text style={styles.error}>{error}</Text>}
            </View>
        </View>
    )
}
