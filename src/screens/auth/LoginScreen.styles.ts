import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    box: {
        width: 300,
        padding: 16,
        borderRadius: 8,
        backgroundColor: '#f9f9f9',
        elevation: 3,
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 16,
    },
    input: {
        height: 48,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 6,
        paddingHorizontal: 12,
        marginBottom: 12,
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 12,
        borderRadius: 6,
        alignItems: 'center',
    },
    buttonDisabled: {
        backgroundColor: '#999',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    error: {
        color: 'red',
        textAlign: 'center',
        marginTop: 8,
    },
})