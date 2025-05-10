import React, { useState } from 'react'
import { View, Text, Pressable, Platform } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'

interface DateFieldProps {
    value: Date
    onChange: (date: Date) => void
    placeholder?: string
    minDate?: Date
    maxDate?: Date
    displayFormat?: (date: Date) => string
}

export const DateField: React.FC<DateFieldProps> = ({
    value,
    onChange,
    placeholder = 'Select Date',
    minDate,
    maxDate,
    displayFormat,
}) => {
    const [showPicker, setShowPicker] = useState(false)

    const handleChange = (_: any, selectedDate?: Date) => {
        setShowPicker(false)
        if (selectedDate) onChange(selectedDate)
    }

    const formattedDate = value ? (
        displayFormat ? displayFormat(value) : value.toDateString()
    ) : (
        placeholder
    )

    return (
        <View className="mb-4">
            <Pressable
                onPress={() => setShowPicker(true)}
                className="w-full px-4 py-3 rounded-lg border border-border bg-white"
            >
                <Text className="text-black">{formattedDate}</Text>
            </Pressable>

            {showPicker && (
                <DateTimePicker
                    value={value}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={handleChange}
                    minimumDate={minDate}
                    maximumDate={maxDate}
                />
            )}
        </View>
    )
}
