import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, Alert, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../../../src/lib/supabase';
import { PrimaryButton } from '../../../src/components/buttons/PrimaryButton';
import { Settings, LogOut, Mail, Calendar, Phone } from 'lucide-react-native';
import ProfilePhotoUpload from '../../../src/components/ProfilePhotoUpload';

interface UserProfile {
  name: string;
  email: string;
  phone?: string;
  dob?: string;
  profile_photo?: string;
}

export default function ProfileScreen() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) throw error;
        setProfile({
          name: profile?.name || user.user_metadata?.name || 'Anonymous',
          email: user.email || '',
          phone: profile?.phone || user.phone || '',
          dob: profile?.dob || user.user_metadata?.dob || '',
          profile_photo: profile?.profile_photo || user.user_metadata?.profile_photo || '',
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      if (Platform.OS === 'web') {
        window.location.href = '/';
      } else {
        router.replace('/');
      }
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  const handleUpdatePhoto = async (photoUri: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { error } = await supabase
          .from('profiles')
          .upsert({
            id: user.id,
            profile_photo: photoUri,
            updated_at: new Date(),
          });

        if (error) throw error;
        setProfile(prev => prev ? { ...prev, profile_photo: photoUri } : null);
      }
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-background">
        <Text>Loading profile...</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-6">
        <View className="items-center mb-8">
          <ProfilePhotoUpload
            onImagePicked={handleUpdatePhoto}
            currentImage={profile?.profile_photo}
          />
          <Text className="text-2xl font-bold mt-4">{profile?.name}</Text>
        </View>

        <View className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <View className="space-y-4">
            <View className="flex-row items-center">
              <Mail size={20} className="text-gray-500" />
              <Text className="ml-3 text-gray-600">{profile?.email}</Text>
            </View>
            
            {profile?.phone && (
              <View className="flex-row items-center">
                <Phone size={20} className="text-gray-500" />
                <Text className="ml-3 text-gray-600">{profile?.phone}</Text>
              </View>
            )}
            
            {profile?.dob && (
              <View className="flex-row items-center">
                <Calendar size={20} className="text-gray-500" />
                <Text className="ml-3 text-gray-600">
                  {new Date(profile.dob).toLocaleDateString()}
                </Text>
              </View>
            )}
          </View>
        </View>

        <View className="space-y-4">
          <PrimaryButton
            title="Account Settings"
            onPress={() => router.push('/settings')}
            icon={<Settings size={20} color="white" />}
          />
          
          <PrimaryButton
            title="Logout"
            onPress={handleLogout}
            icon={<LogOut size={20} color="white" />}
            className="bg-error"
          />
        </View>
      </View>
    </ScrollView>
  );
}