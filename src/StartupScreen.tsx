import React, { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'
import { ActivityIndicator, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export default function StartupScreen() {
    const [loading, setLoading] = useState(true)
    const navigation = useNavigation()

    useEffect(() => {
        const checkSession = async () => {
            const { data } = await supabase.auth.getSession()
            const session = data.session

            if (session) {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'ChatScreen' }],
                })
            } else {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                })
            }

            setLoading(false)
        }

        checkSession()
    }, [navigation])

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center bg-background">
                <ActivityIndicator size="large" />
            </View>
        )
    }

    return null
}
