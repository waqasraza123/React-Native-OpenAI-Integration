import React, { useState } from 'react'
import {
    View,
    KeyboardAvoidingView,
    Platform,
    Alert,
    Text,
} from 'react-native'
import { supabase } from '../../lib/supabase'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import { PasswordField } from '../../components/PasswordField'
import { InputField } from '../../components/fields/InputField'
import { PrimaryButton } from '../../components/buttons/PrimaryButton'
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
                <View className="w-full max-w-md bg-surface p-8 rounded-xl shadow-2xl">

                    {/* Text Logo Branding */}
                    <View className="items-center mb-8">
                        <Text className="text-3xl font-extrabold text-primary tracking-tight">
                            MagicLink
                        </Text>
                        <Text className="text-base text-gray-500 mt-1">
                            Secure login via magic link or password
                        </Text>
                    </View>

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
                        title="Login"
                        onPress={handleLogin}
                        loading={loading}
                        disabled={!email || !password}
                    />

                    {error && (
                        <View className="bg-error/10 border border-error rounded-md mt-4 p-2">
                            <Text className="text-error text-sm text-center">
                                {error}
                            </Text>
                        </View>
                    )}

                    <Text
                        onPress={() => navigation.navigate('SignUp')}
                        className="mt-6 text-sm text-accent text-center"
                    >
                        Don't have an account?{' '}
                        <Text className="text-primary font-semibold">Sign Up</Text>
                    </Text>
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}
