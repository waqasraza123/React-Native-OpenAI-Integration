import React, { useState } from 'react'
import {
    Alert,
    ScrollView,
    View,
    Text,
    TextInput as RNTextInput,
    ActivityIndicator,
    Pressable,
    Platform,
} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { supabase } from '../../lib/supabase'
import { useNavigation } from '@react-navigation/native'
import '../../styles/global.css'

export default function SignUpScreen() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [dob, setDob] = useState<Date>(new Date())
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [showDatePicker, setShowDatePicker] = useState(false)
    const navigation = useNavigation<any>()

    const handleSignUp = async () => {
        setLoading(true)
        setError(null)

        const { error: signUpError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    name,
                    dob: dob.toISOString(),
                },
            },
        })

        setLoading(false)

        if (signUpError) {
            setError(signUpError.message)
            return
        }

        Alert.alert('Success', 'Registration successful! Please check your email to confirm your account.')
    }

    return (
        <ScrollView
            className="bg-background px-6 py-12"
            contentContainerStyle={{
                flexGrow: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <View className="w-full max-w-md bg-surface rounded-xl p-6 shadow-2xl">
                <Text className="text-3xl font-semibold text-center text-black mb-8">Create an Account</Text>

                <RNTextInput
                    placeholder="Full Name"
                    value={name}
                    onChangeText={setName}
                    className="w-full px-4 py-3 mb-4 rounded-lg border border-border bg-white text-black text-base"
                    placeholderTextColor="#8E8E93"
                />

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

                <Pressable
                    onPress={() => setShowDatePicker(true)}
                    className="w-full px-4 py-3 mb-4 rounded-lg border border-border bg-white text-black text-base"
                >
                    <Text className="text-black">{dob.toDateString()}</Text>
                </Pressable>

                {showDatePicker && (
                    <DateTimePicker
                        value={dob}
                        mode="date"
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        onChange={(_, selectedDate) => {
                            setShowDatePicker(false)
                            if (selectedDate) setDob(selectedDate)
                        }}
                    />
                )}

                <Pressable
                    onPress={handleSignUp}
                    disabled={loading}
                    className={`w-full mt-4 py-3 rounded-lg items-center justify-center ${loading ? 'bg-primary/70' : 'bg-primary'
                        }`}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text className="text-white font-semibold text-base">Register</Text>
                    )}
                </Pressable>

                <Pressable
                    onPress={() => navigation.navigate('Login')}
                    className="mt-6"
                >
                    <Text className="text-sm text-accent text-center">
                        Already have an account?{' '}
                        <Text className="text-primary font-semibold">Sign In</Text>
                    </Text>
                </Pressable>

                {error && (
                    <View className="mt-4 p-3 rounded-md bg-error/10 border border-error">
                        <Text className="text-error text-sm text-center">{error}</Text>
                    </View>
                )}
            </View>
        </ScrollView>
    )
}
