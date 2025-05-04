import React, { useState } from 'react'
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    Alert
} from 'react-native'
import { styles } from './LoginScreen.styles'
import { magic } from '../../lib/magic'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'

type LoginScreenNavigationProp = NativeStackNavigationProp<any, 'Login'>

export default function LoginScreen() {
    const navigation = useNavigation<LoginScreenNavigationProp>()
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleLogin = async () => {
        try {
            setLoading(true)
            setError(null)
            await magic.auth.loginWithEmailOTP({ email })
            Alert.alert('Success', 'Check your email for the login link.')
        } catch (err: any) {
            setError('Login failed. Please try again.')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <Text style={styles.title}>Magic Link Login</Text>

                <TextInput
                    style={styles.input}
                    placeholder="you@example.com"
                    value={email}
                    onChangeText={setEmail}
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

                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                    <Text style={{ textAlign: 'center', marginTop: 16, color: '#007bff' }}>
                        Don't have an account? Sign Up
                    </Text>
                </TouchableOpacity>

                {error && <Text style={styles.error}>{error}</Text>}
            </View>
        </View>
    )
}
