import React, { useState } from 'react'
import {
    Alert,
    ScrollView,
    View,
    Text,
    Pressable,
    ActivityIndicator,
    Platform,
} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { supabase } from '../../lib/supabase'
import { useNavigation } from '@react-navigation/native'
import { InputField } from '../../components/fields/InputField'
import { PasswordField } from '../../components/PasswordField'
import { PrimaryButton } from '../../components/buttons/PrimaryButton'
import '../../styles/global.css'
import { DateField } from '../../components/fields/DateField'

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

        Alert.alert(
            'Success',
            'Registration successful! Please check your email to confirm your account.'
        )
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
                <Text className="text-3xl font-semibold text-center text-black mb-8">
                    Create an Account
                </Text>

                <InputField
                    placeholder="Full Name"
                    value={name}
                    onChangeText={setName}
                />

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

                <DateField
                    value={dob}
                    onChange={setDob}
                    minDate={new Date(1900, 0, 1)}
                    maxDate={new Date()}
                    displayFormat={(date: any) => date.toLocaleDateString()}
                />


                <PrimaryButton
                    title="Register"
                    onPress={handleSignUp}
                    loading={loading}
                    disabled={!email || !password || !name}
                />

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
