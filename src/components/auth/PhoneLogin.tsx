import React from 'react'
import { View } from 'react-native'
import { InputField } from '../fields/InputField'
import { PrimaryButton } from '../buttons/PrimaryButton'

interface PhoneLoginProps {
    phone: string
    setPhone: (phone: string) => void
    otp: string
    setOtp: (otp: string) => void
    otpSent: boolean
    onSendOtp: () => void
    onVerifyOtp: () => void
    loading: boolean
}

export const PhoneLogin = ({
    phone,
    setPhone,
    otp,
    setOtp,
    otpSent,
    onSendOtp,
    onVerifyOtp,
    loading,
}: PhoneLoginProps) => {
    return (
        <View>
            <InputField
                placeholder="Phone (+1234567890)"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
            />
            {otpSent && (
                <InputField
                    placeholder="OTP Code"
                    value={otp}
                    onChangeText={setOtp}
                    keyboardType="number-pad"
                />
            )}
            {!otpSent ? (
                <PrimaryButton
                    title="Send OTP"
                    onPress={onSendOtp}
                    loading={loading}
                    disabled={!phone}
                />
            ) : (
                <PrimaryButton
                    title="Verify OTP"
                    onPress={onVerifyOtp}
                    loading={loading}
                    disabled={!otp}
                />
            )}
        </View>
    )
}