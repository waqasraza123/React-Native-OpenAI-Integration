import React, { useState } from 'react'
import {
    View,
    KeyboardAvoidingView,
    Platform,
    Alert,
    Text,
    TextInput as RNTextInput,
} from 'react-native'
import { Button } from 'react-native'
import { supabase } from '../../lib/supabase'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import '../../styles/global.css'

type LoginScreenNavigationProp = NativeStackNavigationProp<any, 'Login'>

export default function LoginScreen() {
    const navigation = useNavigation<LoginScreenNavigationProp>()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleLogin = async () => {
        try {
            setLoading(true)
            setError(null)

            const { error: loginError } = await supabase.auth.signInWithPassword({
                email,
                password,
            })

            if (loginError) {
                setError(loginError.message)
                return
            }

            Alert.alert('Login Successful', 'You are now logged in.')
        } catch (err) {
            console.error(err)
            setError('Login failed. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <View className="flex-1 justify-center items-center bg-background px-6">
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                className="flex-1 w-full justify-center items-center"
            >
                <View className="w-full max-w-md rounded-lg p-6 bg-surface shadow-2xl">
                    <Text className="text-3xl font-semibold text-center mb-8 text-black leading-snug">
                        Welcome Back
                    </Text>

                    <RNTextInput
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        className="w-full px-4 py-3 mb-4 rounded-lg border border-border bg-white text-black text-base"
                        placeholderTextColor="#8E8E93"
                    />

                    <RNTextInput
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        className="w-full px-4 py-3 mb-4 rounded-lg border border-border bg-white text-black text-base"
                        placeholderTextColor="#8E8E93"
                    />

                    <View className="w-full mt-3">
                        <Button
                            title={loading ? '' : 'Login'}
                            disabled={loading || !email || !password}
                            onPress={handleLogin}
                            color="#007AFF"
                        />
                        {loading && (
                            <Text className="mt-3 text-center text-accent text-sm">Loading...</Text>
                        )}
                    </View>

                    <Text
                        onPress={() => navigation.navigate('SignUp')}
                        className="mt-6 text-sm text-accent text-center"
                    >
                        Don't have an account?{' '}
                        <Text className="text-primary font-semibold">Sign Up</Text>
                    </Text>

                    {error && <Text className="text-error text-center mt-4 text-sm">{error}</Text>}
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}
