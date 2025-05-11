import React, { useState, useEffect } from 'react'
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
import { useRouter } from 'expo-router'
import Toast from 'react-native-toast-message'
import '../../styles/global.css'
import { EmailLogin } from '../../components/auth/EmailLogin'
import { PhoneLogin } from '../../components/auth/PhoneLogin'
import { SocialLogin } from '../../components/auth/SocialLogin'
import { Divider } from '../../components/common/Divider'
import { ErrorMessage } from '../../components/common/ErrorMessage'

type LoginScreenNavigationProp = NativeStackNavigationProp<any, 'Login'>

export default function LoginScreen() {
    const navigation = useNavigation<LoginScreenNavigationProp>()
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [otp, setOtp] = useState('')
    const [otpSent, setOtpSent] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [initialSession, setInitialSession] = useState<any>(undefined)

    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => {
            setInitialSession(data.session)
        })

        const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN' && initialSession == null) {
                if (Platform.OS === 'web') {
                    Toast.show({
                        type: 'success',
                        text1: 'Login Successful',
                        text2: 'You are now logged in.',
                    })
                } else {
                    Alert.alert('Login Successful', 'You are now logged in.')
                }
                setInitialSession(session)
                router.replace('/subscription')
            }
        })

        return () => {
            listener.subscription.unsubscribe()
        }
    }, [initialSession, router])

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
                Alert.alert('Login Successful', 'You are now logged in.')
                setInitialSession(data.session)
                router.replace('/subscription')
            }
        } catch (err) {
            console.error(err)
            setError('Login failed. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const sendOtp = async () => {
        try {
            setLoading(true)
            const { error } = await supabase.auth.signInWithOtp({
                phone,
            })

            if (error) {
                setError(error.message)
                return
            }

            setOtpSent(true)
            Alert.alert('OTP Sent', 'Check your phone for a verification code.')
        } catch (err) {
            console.error(err)
            setError('Failed to send OTP.')
        } finally {
            setLoading(false)
        }
    }

    const verifyOtp = async () => {
        try {
            setLoading(true)
            const { data, error } = await supabase.auth.verifyOtp({
                phone,
                token: otp,
                type: 'sms',
            })

            if (error) {
                setError(error.message)
                return
            }

            if (data.session) {
                Alert.alert('Login Successful', 'You are now logged in via phone.')
                setInitialSession(data.session)
                router.replace('/subscription')
            }
        } catch (err) {
            console.error(err)
            setError('OTP verification failed.')
        } finally {
            setLoading(false)
        }
    }

    const handleOAuthLogin = async (provider: 'google' | 'github' | 'figma') => {
        try {
            const { error } = await supabase.auth.signInWithOAuth({ provider })
            if (error) setError(error.message)
        } catch (err) {
            console.error(`${provider} login failed`, err)
            setError(`${provider.charAt(0).toUpperCase() + provider.slice(1)} login failed.`)
        }
    }

    return (
        <View className="flex-1 justify-center items-center bg-background px-6">
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                className="flex-1 w-full justify-center items-center"
            >
                <View
                    className={`w-full ${Platform.OS === 'web'
                        ? 'max-w-md bg-surface p-8 rounded-xl shadow-2xl'
                        : 'px-0'
                        }`}
                >
                    <View className="items-center mb-8">
                        <Text className="text-3xl font-extrabold text-primary tracking-tight">MagicLink</Text>
                        <Text className="text-base text-gray-500 mt-1">Secure login with multiple options</Text>
                    </View>

                    <EmailLogin
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                        onSubmit={handleLogin}
                        loading={loading}
                    />

                    <Divider />

                    <PhoneLogin
                        phone={phone}
                        setPhone={setPhone}
                        otp={otp}
                        setOtp={setOtp}
                        otpSent={otpSent}
                        onSendOtp={sendOtp}
                        onVerifyOtp={verifyOtp}
                        loading={loading}
                    />

                    <ErrorMessage message={error || ''} />

                    <SocialLogin onLogin={handleOAuthLogin} />

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