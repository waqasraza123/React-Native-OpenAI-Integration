import React from 'react'
import { View, Text, Pressable, Image } from 'react-native'

interface SocialLoginProps {
    onLogin: (provider: 'google' | 'github' | 'figma') => void
}

export const SocialLogin = ({ onLogin }: SocialLoginProps) => {
    return (
        <View>
            <Pressable
                onPress={() => onLogin('google')}
                className="flex-row items-center justify-center border border-gray-300 rounded-lg py-3 bg-white mt-4"
            >
                <Image
                    source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png' }}
                    style={{ width: 20, height: 20, marginRight: 8 }}
                />
                <Text className="text-base text-gray-800 font-medium">Continue with Google</Text>
            </Pressable>

            <Pressable
                onPress={() => onLogin('github')}
                className="flex-row items-center justify-center border border-gray-300 rounded-lg py-3 bg-white mt-4"
            >
                <Image
                    source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/Github_Logo_2018.svg' }}
                    style={{ width: 20, height: 20, marginRight: 8 }}
                />
                <Text className="text-base text-gray-800 font-medium">Continue with GitHub</Text>
            </Pressable>

            <Pressable
                onPress={() => onLogin('figma')}
                className="flex-row items-center justify-center border border-gray-300 rounded-lg py-3 bg-white mt-4"
            >
                <Image
                    source={{ uri: 'https://cdn.worldvectorlogo.com/logos/figma-1.svg' }}
                    style={{ width: 20, height: 20, marginRight: 8 }}
                />
                <Text className="text-base text-gray-800 font-medium">Continue with Figma</Text>
            </Pressable>
        </View>
    )
}