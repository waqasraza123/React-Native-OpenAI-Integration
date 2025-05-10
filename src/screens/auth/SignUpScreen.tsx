import React, { useState } from 'react';
import { ScrollView, View, Text, Pressable, Alert, Platform } from 'react-native';
import { supabase } from '../../lib/supabase';
import { useNavigation } from '@react-navigation/native';
import { InputField } from '../../components/fields/InputField';
import { PasswordField } from '../../components/PasswordField';
import { PrimaryButton } from '../../components/buttons/PrimaryButton';
import { DateField } from '../../components/fields/DateField';
import ProfilePhotoUpload from '../../components/ProfilePhotoUpload';

export default function SignUpScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [dob, setDob] = useState<Date>(new Date());
    const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigation = useNavigation<any>();

    const handleSignUp = async () => {
        setLoading(true);
        setError(null);

        let profilePhotoUrl = '';

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
        });

        setLoading(false);

        if (signUpError) {
            setError(signUpError.message);
            return;
        }

        Alert.alert(
            'Success',
            'Registration successful! Please check your email to confirm your account. If you don’t see it, check your spam folder.'
        );
    };

    return (
        <ScrollView
            style={{ backgroundColor: '#f5f5f5', padding: 16 }}
            contentContainerStyle={{
                flexGrow: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <View style={{ width: '100%', maxWidth: 400, backgroundColor: '#fff', padding: 20, borderRadius: 8 }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>
                    Create an Account
                </Text>

                <ProfilePhotoUpload onImagePicked={setProfilePhoto} />

                <InputField placeholder="Full Name" value={name} onChangeText={setName} />
                <InputField placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
                <PasswordField placeholder="Password" value={password} onChangeText={setPassword} />
                <DateField value={dob} onChange={setDob} minDate={new Date(1900, 0, 1)} maxDate={new Date()} displayFormat={(date: Date) => date.toLocaleDateString()} />

                <PrimaryButton
                    title="Register"
                    onPress={handleSignUp}
                    loading={loading}
                    disabled={!email || !password || !name}
                />

                <Pressable onPress={() => navigation.navigate('Login')} style={{ marginTop: 20 }}>
                    <Text style={{ textAlign: 'center', fontSize: 14 }}>
                        Already have an account?{' '}
                        <Text style={{ color: '#007AFF' }}>Sign In</Text>
                    </Text>
                </Pressable>

                {error && (
                    <View style={{ marginTop: 20, padding: 10, backgroundColor: '#f8d7da', borderRadius: 4 }}>
                        <Text style={{ color: '#721c24', textAlign: 'center' }}>{error}</Text>
                    </View>
                )}
            </View>
        </ScrollView>
    );
}
