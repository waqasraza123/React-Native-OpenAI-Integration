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
import '../../styles/global.css';

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
        <View className="flex-1 justify-center items-center bg-white px-6">
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                className="flex-1 w-full justify-center items-center"
            >
                <View className="w-full max-w-md rounded-2xl p-6 items-center bg-white shadow-lg">
                    <Text className="text-2xl font-semibold text-center mb-6 text-black">
                        Welcome Back
                    </Text>

                    <RNTextInput
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        className="w-full px-4 py-3 mb-4 rounded-lg border border-gray-300 bg-white text-black"
                        placeholderTextColor="#888"
                    />

                    <RNTextInput
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        className="w-full px-4 py-3 mb-4 rounded-lg border border-gray-300 bg-white text-black"
                        placeholderTextColor="#888"
                    />

                    <View className="w-full mt-2">
                        <Button
                            title={loading ? '' : 'Login'}
                            disabled={loading || !email || !password}
                            onPress={handleLogin}
                            color="#007AFF"
                        />
                        {loading && 'Loading...'}
                    </View>

                    <Text
                        onPress={() => navigation.navigate('SignUp')}
                        className="mt-6 text-sm text-gray-700"
                    >
                        Don't have an account?{' '}
                        <Text className="text-blue-600 font-semibold">Sign Up</Text>
                    </Text>

                    {error && <Text className="text-red-500 text-center mt-4">{error}</Text>}
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}
