import React, { useState, useEffect } from 'react'
import {
    View,
    KeyboardAvoidingView,
    Platform,
    Alert,
    Text,
    Pressable,
    Image,
} from 'react-native'
import { supabase } from '../../lib/supabase'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import { PasswordField } from '../../components/PasswordField'
import { InputField } from '../../components/fields/InputField'
import { PrimaryButton } from '../../components/buttons/PrimaryButton'
import Toast from 'react-native-toast-message'
import '../../styles/global.css'

type LoginScreenNavigationProp = NativeStackNavigationProp<any, 'Login'>

export default function LoginScreen() {
    const navigation = useNavigation<LoginScreenNavigationProp>()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
            if (session && event === 'SIGNED_IN') {
                if (Platform.OS === 'web') {
                    Toast.show({
                        type: 'success',
                        text1: 'Login Successful',
                        text2: 'You are now logged in.',
                    })
                } else {
                    Alert.alert('Login Successful', 'You are now logged in.')
                }
            }
        })
        return () => {
            listener.subscription.unsubscribe()
        }
    }, [])

    const handleLogin = async () => {
        try {
            setLoading(true)
            setError(null)

            const { data, error: loginError } = await supabase.auth.signInWithPassword({
                email,
                password,
            })

            if (loginError) {
                setError(loginError.message)
                return
            }

            if (data.session) {
                if (Platform.OS === 'web') {
                    Toast.show({
                        type: 'success',
                        text1: 'Login Successful',
                        text2: 'You are now logged in.',
                    })
                } else {
                    Alert.alert('Login Successful', 'You are now logged in.')
                }
            }
        } catch (err) {
            console.error(err)
            setError('Login failed. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const handleOAuthLogin = async (provider: 'google' | 'github' | 'figma') => {
        try {
            const { error } = await supabase.auth.signInWithOAuth({ provider })
            if (error) {
                setError(error.message)
            }
        } catch (err) {
            console.error(`${provider} login failed`, err)
            setError(`${provider.charAt(0).toUpperCase() + provider.slice(1)} login failed. Please try again.`)
        }
    }

    return (
        <View className="flex-1 justify-center items-center bg-background px-6">
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                className="flex-1 w-full justify-center items-center"
            >
                <View className="w-full max-w-md bg-surface p-8 rounded-xl shadow-2xl">

                    {/* Branding */}
                    <View className="items-center mb-8">
                        <Text className="text-3xl font-extrabold text-primary tracking-tight">
                            MagicLink
                        </Text>
                        <Text className="text-base text-gray-500 mt-1">
                            Secure login via magic link or password
                        </Text>
                    </View>

                    {/* Email/Password Login */}
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

                    {/* Error Message */}
                    {error && (
                        <View className="bg-error/10 border border-error rounded-md mt-4 p-2">
                            <Text className="text-error text-sm text-center">{error}</Text>
                        </View>
                    )}

                    {/* Divider */}
                    <View className="flex-row items-center my-6">
                        <View className="flex-1 h-px bg-gray-300" />
                        <Text className="mx-3 text-gray-400 text-sm">or</Text>
                        <View className="flex-1 h-px bg-gray-300" />
                    </View>

                    {/* OAuth Buttons */}
                    <Pressable
                        onPress={() => handleOAuthLogin('google')}
                        className="flex-row items-center justify-center border border-gray-300 rounded-lg py-3 bg-white"
                    >
                        <Image
                            source={{
                                uri: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png',
                            }}
                            style={{ width: 20, height: 20, marginRight: 8 }}
                            resizeMode="contain"
                        />
                        <Text className="text-base text-gray-800 font-medium">
                            Continue with Google
                        </Text>
                    </Pressable>

                    <Pressable
                        onPress={() => handleOAuthLogin('github')}
                        className="flex-row items-center justify-center border border-gray-300 rounded-lg py-3 bg-white mt-4"
                    >
                        <Image
                            source={{
                                uri: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/Github_Logo_2018.svg',
                            }}
                            style={{ width: 20, height: 20, marginRight: 8 }}
                            resizeMode="contain"
                        />
                        <Text className="text-base text-gray-800 font-medium">
                            Continue with GitHub
                        </Text>
                    </Pressable>

                    <Pressable
                        onPress={() => handleOAuthLogin('figma')}
                        className="flex-row items-center justify-center border border-gray-300 rounded-lg py-3 bg-white mt-4"
                    >
                        <Image
                            source={{
                                uri: 'https://cdn.worldvectorlogo.com/logos/figma-1.svg',
                            }}
                            style={{ width: 20, height: 20, marginRight: 8 }}
                            resizeMode="contain"
                        />
                        <Text className="text-base text-gray-800 font-medium">
                            Continue with Figma
                        </Text>
                    </Pressable>

                    {/* Sign Up Link */}
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
