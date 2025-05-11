import React, { useState } from 'react'
import {
    ScrollView,
    View,
    Text,
    Pressable,
    Alert,
    Platform,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { supabase } from '../../lib/supabase'

import { InputField } from '../../components/fields/InputField'
import { PasswordField } from '../../components/PasswordField'
import { PrimaryButton } from '../../components/buttons/PrimaryButton'
import { DateField } from '../../components/fields/DateField'
import ProfilePhotoUpload from '../../components/ProfilePhotoUpload'
import Toast from 'react-native-toast-message'

export default function SignUpScreen() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [dob, setDob] = useState<Date>(new Date())
    const [profilePhoto, setProfilePhoto] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const navigation = useNavigation<any>()

    const handleSignUp = async () => {
        setLoading(true)
        setError(null)

        try {
            let profilePhotoUrl = ''

            if (profilePhoto) {
                const fileExt = profilePhoto.split('.').pop()
                const fileName = `${Date.now()}.${fileExt}`
                const filePath = `avatars/${fileName}`

                const response = await fetch(profilePhoto)
                const blob = await response.blob()

                const { error: uploadError } = await supabase.storage
                    .from('avatars')
                    .upload(filePath, blob, {
                        cacheControl: '3600',
                        upsert: false,
                        contentType: blob.type,
                    })

                if (uploadError) {
                    throw uploadError
                }

                const { data: publicUrlData } = supabase.storage
                    .from('avatars')
                    .getPublicUrl(filePath)

                profilePhotoUrl = publicUrlData?.publicUrl ?? ''
            }

            const { error: signUpError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        name,
                        dob: dob.toISOString(),
                        profile_photo: profilePhotoUrl,
                    },
                },
            })

            if (signUpError) {
                throw signUpError
            }

            if (Platform.OS === 'web') {
                Toast.show({
                    type: 'success',
                    text1: 'Registration Successful',
                    text2: 'Please check your email to confirm your account.',
                })
            } else {
                Alert.alert(
                    'Success',
                    'Registration successful! Please check your email to confirm your account.'
                )
            }
        } catch (err: any) {
            console.error('Signup error:', err)
            setError(err?.message || 'Registration failed. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <ScrollView
            className="flex-1 px-6 bg-white"
            contentContainerStyle={{
                flexGrow: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <View className="w-full max-w-md rounded-2xl p-6 bg-gray-100 shadow-lg">
                <Text className="text-3xl font-bold text-center mb-6 text-black">
                    Create an Account
                </Text>

                <View className="mb-6">
                    <ProfilePhotoUpload onImagePicked={setProfilePhoto} />
                </View>

                <View className="space-y-4">
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
                        displayFormat={(date: Date) => date.toLocaleDateString()}
                    />
                </View>

                <View className="mt-6">
                    <PrimaryButton
                        title="Register"
                        onPress={handleSignUp}
                        loading={loading}
                        disabled={!email || !password || !name}
                    />
                </View>

                <Pressable onPress={() => navigation.navigate('Login')} className="mt-6">
                    <Text className="text-center text-sm text-gray-600">
                        Already have an account?{' '}
                        <Text className="text-primary font-medium">Sign In</Text>
                    </Text>
                </Pressable>

                {error && (
                    <View className="mt-4 bg-red-100 border border-red-400 rounded-lg p-3">
                        <Text className="text-red-700 text-sm text-center">
                            {error}
                        </Text>
                    </View>
                )}
            </View>
        </ScrollView>
    )
}
