import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Alert, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../../lib/supabase';
import { PrimaryButton } from '../../components/buttons/PrimaryButton';
import Icon from 'react-native-vector-icons/FontAwesome';
import ProfilePhotoUpload from '../../components/ProfilePhotoUpload';
import Toast from 'react-native-toast-message';
import { StyleSheet } from 'react-native';

interface UserProfile {
  name: string;
  email: string;
  phone?: string;
  dob?: string;
  profile_photo?: string;
}

export default function ProfileScreen() {
  const navigation = useNavigation();
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
        Toast.show({
          type: 'success',
          text1: 'Logged out successfully',
        });
        window.location.href = '/';
      } else {
        Alert.alert('Success', 'Logged out successfully');
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
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
        Toast.show({
          type: 'success',
          text1: 'Profile photo updated successfully',
        });
      }
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <ProfilePhotoUpload
            onImagePicked={handleUpdatePhoto}
            currentImage={profile?.profile_photo}
          />
          <Text style={styles.name}>{profile?.name}</Text>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Icon name="envelope" size={20} color="#6B7280" />
            <Text style={styles.infoText}>{profile?.email}</Text>
          </View>

          {profile?.phone && (
            <View style={styles.infoRow}>
              <Icon name="phone" size={20} color="#6B7280" />
              <Text style={styles.infoText}>{profile?.phone}</Text>
            </View>
          )}

          {profile?.dob && (
            <View style={styles.infoRow}>
              <Icon name="calendar" size={20} color="#6B7280" />
              <Text style={styles.infoText}>
                {new Date(profile.dob).toLocaleDateString()}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.buttonContainer}>
          <PrimaryButton
            title="Account Settings"
            onPress={() => navigation.navigate('Settings')}
            icon={<Icon name="cogs" size={20} color="white" />}
          />

          <PrimaryButton
            title="Logout"
            onPress={handleLogout}
            icon={<Icon name="sign-out" size={20} color="white" />}
            className="bg-red-500"
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    padding: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  loadingText: {
    fontSize: 16,
    color: '#6B7280',
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 16,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
      web: {
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      },
    }),
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#374151',
  },
  buttonContainer: {
    gap: 16,
  },
});
