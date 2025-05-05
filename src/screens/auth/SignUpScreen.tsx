import React, { useState } from 'react'
import {
    Alert,
    ScrollView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    StyleSheet,
} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { supabase } from '../../lib/supabase'
import { useNavigation } from '@react-navigation/native'

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
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>Create an Account</Text>

                <TextInput
                    value={name}
                    onChangeText={setName}
                    placeholder="Full Name"
                    style={styles.input}
                />

                <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder="you@example.com"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    style={styles.input}
                />

                <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Password"
                    secureTextEntry
                    style={styles.input}
                />

                <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateButton}>
                    <Text>{dob.toDateString()}</Text>
                </TouchableOpacity>

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

                <TouchableOpacity
                    onPress={handleSignUp}
                    style={styles.submitButton}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.submitButtonText}>Register</Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={{ textAlign: 'center', marginTop: 16, color: '#007bff' }}>
                        Already have an account? Sign In
                    </Text>
                </TouchableOpacity>

                {error && <Text style={styles.error}>{error}</Text>}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#f2f2f2',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    card: {
        backgroundColor: '#fff',
        width: '100%',
        maxWidth: 380,
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    title: {
        fontSize: 22,
        marginBottom: 20,
        textAlign: 'center',
        fontWeight: '600',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        padding: 10,
        marginBottom: 16,
    },
    dateButton: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        padding: 12,
        marginBottom: 16,
        backgroundColor: '#f9f9f9',
    },
    submitButton: {
        backgroundColor: '#007bff',
        borderRadius: 6,
        padding: 14,
        alignItems: 'center',
        marginTop: 10,
    },
    submitButtonText: {
        color: '#fff',
        fontWeight: '600',
    },
    error: {
        color: 'red',
        marginTop: 16,
        textAlign: 'center',
    },
})
