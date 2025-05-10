import React, { useState } from 'react'
import {
    Alert,
    ScrollView,
    StyleSheet,
    ActivityIndicator,
} from 'react-native'
import { TextInput, Button, Card, Text, Snackbar } from 'react-native-paper'
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
            <Card style={styles.card}>
                <Card.Content>
                    <Text variant='titleLarge' style={styles.title}>Create an Account</Text>

                    <TextInput
                        label="Full Name"
                        value={name}
                        onChangeText={setName}
                        mode="outlined"
                        style={styles.input}
                    />

                    <TextInput
                        label="Email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        mode="outlined"
                        style={styles.input}
                    />

                    <TextInput
                        label="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        mode="outlined"
                        style={styles.input}
                    />

                    <Button
                        mode="outlined"
                        onPress={() => setShowDatePicker(true)}
                        style={styles.dateButton}
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

                    <Button
                        mode="contained"
                        onPress={handleSignUp}
                        disabled={loading}
                        style={styles.submitButton}
                    >
                        {loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            'Register'
                        )}
                    </Button>

                    <Button
                        mode="text"
                        onPress={() => navigation.navigate('Login')}
                        style={styles.signInButton}
                    >
                        Already have an account? Sign In
                    </Button>

                    {error && <Snackbar visible={!!error} onDismiss={() => setError(null)}>{error}</Snackbar>}
                </Card.Content>
            </Card>
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
        marginBottom: 16,
    },
    dateButton: {
        marginBottom: 16,
    },
    submitButton: {
        marginTop: 10,
    },
    signInButton: {
        textAlign: 'center',
        marginTop: 16,
    },
})
