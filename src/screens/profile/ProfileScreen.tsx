import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, Alert, Platform } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { supabase } from '../../lib/supabase'
import { PrimaryButton } from '../../components/buttons/PrimaryButton'
import Icon from 'react-native-vector-icons/FontAwesome'
import ProfilePhotoUpload from '../../components/ProfilePhotoUpload'
import Toast from 'react-native-toast-message'

interface UserProfile {
  name: string
  email: string
  phone?: string
  dob?: string
  profile_photo?: string
}

export default function ProfileScreen() {
  const navigation = useNavigation()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data: profileData, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()

        if (error) throw error

        setProfile({
          name: profileData?.name || user.user_metadata?.name || 'Anonymous',
          email: user.email || '',
          phone: profileData?.phone || user.phone || '',
          dob: profileData?.dob || user.user_metadata?.dob || '',
          profile_photo: profileData?.profile_photo || user.user_metadata?.profile_photo || '',
        })
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error

      if (Platform.OS === 'web') {
        Toast.show({ type: 'success', text1: 'Logged out successfully' })
        window.location.href = '/'
      } else {
        Alert.alert('Success', 'Logged out successfully')
        navigation.reset({ index: 0, routes: [{ name: 'Login' }] })
      }
    } catch (error: any) {
      Alert.alert('Error', error.message)
    }
  }

  const handleUpdatePhoto = async (photoUri: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { error } = await supabase
          .from('profiles')
          .upsert({
            id: user.id,
            profile_photo: photoUri,
            updated_at: new Date(),
          })

        if (error) throw error

        setProfile(prev => prev ? { ...prev, profile_photo: photoUri } : null)

        Toast.show({
          type: 'success',
          text1: 'Profile photo updated successfully',
        })
      }
    } catch (error: any) {
      Alert.alert('Error', error.message)
    }
  }

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <Text className="text-base text-gray-500">Loading profile...</Text>
      </View>
    )
  }

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-6">
        <View className="items-center mb-8">
          <ProfilePhotoUpload
            onImagePicked={handleUpdatePhoto}
            currentImage={profile?.profile_photo}
          />
          <Text className="text-2xl font-bold text-gray-900 mt-4">{profile?.name}</Text>
        </View>

        <View className="bg-white rounded-xl p-6 mb-6 shadow-md">
          <View className="flex-row items-center mb-4">
            <Icon name="envelope" size={20} color="#6B7280" />
            <Text className="ml-3 text-gray-700">{profile?.email}</Text>
          </View>

          {profile?.phone && (
            <View className="flex-row items-center mb-4">
              <Icon name="phone" size={20} color="#6B7280" />
              <Text className="ml-3 text-gray-700">{profile.phone}</Text>
            </View>
          )}

          {profile?.dob && (
            <View className="flex-row items-center">
              <Icon name="calendar" size={20} color="#6B7280" />
              <Text className="ml-3 text-gray-700">
                {new Date(profile.dob).toLocaleDateString()}
              </Text>
            </View>
          )}
        </View>

        <View className="space-y-4">
          <PrimaryButton
            title="Logout"
            onPress={handleLogout}
            icon={<Icon name="sign-out" size={20} color="white" />}
            className="bg-red-500"
          />
        </View>
      </View>
    </ScrollView>
  )
}
