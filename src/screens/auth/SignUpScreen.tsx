import React, { useState } from 'react'
import { Button, Input, Text, YStack, Spinner, XStack, Label } from 'tamagui'
import { Alert } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { supabase } from '../../lib/supabase'

export default function SignUpScreen() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [dob, setDob] = useState<Date>(new Date())
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [showDatePicker, setShowDatePicker] = useState(false)

    const handleSignUp = async () => {
        setLoading(true)
        setError(null)

        const { data, error: signUpError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    name,
                    dob: dob.toISOString()
                }
            }
        })

        setLoading(false)

        if (signUpError) {
            setError(signUpError.message)
            return
        }

        Alert.alert('Success', 'Registration successful! Please check your email to confirm your account.')
    }

    return (
        <XStack
            flex={1}
            backgroundColor="$bg"
            alignItems="center"
            justifyContent="center"
            padding="$4"
        >
            <YStack
                width={320}
                gap="$3"
                padding="$4"
                borderRadius="$4"
                backgroundColor="$color"
                elevation="$2"
            >
                <Text fontSize="$6" fontWeight="700" textAlign="center">
                    Sign Up
                </Text>

                <YStack gap="$2">
                    <Label>Name</Label>
                    <Input value={name} onChangeText={setName} placeholder="Full Name" />
                </YStack>

                <YStack gap="$2">
                    <Label>Email</Label>
                    <Input
                        value={email}
                        onChangeText={setEmail}
                        placeholder="you@example.com"
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />
                </YStack>

                <YStack gap="$2">
                    <Label>Password</Label>
                    <Input
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Password"
                        secureTextEntry
                    />
                </YStack>

                <YStack gap="$2">
                    <Label>Date of Birth</Label>
                    <Button
                        variant="outlined"
                        onPress={() => setShowDatePicker(true)}
                    >
                        {dob.toDateString()}
                    </Button>
                    {showDatePicker && (
                        <DateTimePicker
                            value={dob}
                            mode="date"
                            display="default"
                            onChange={(_, selectedDate) => {
                                setShowDatePicker(false)
                                if (selectedDate) setDob(selectedDate)
                            }}
                        />
                    )}
                </YStack>

                <Button
                    size="$4"
                    theme="light"
                    onPress={handleSignUp}
                    disabled={loading}
                >
                    {loading ? <Spinner size="small" color="$color" /> : 'Register'}
                </Button>

                {error && (
                    <Text color="red" textAlign="center">
                        {error}
                    </Text>
                )}
            </YStack>
        </XStack>
    )
}
