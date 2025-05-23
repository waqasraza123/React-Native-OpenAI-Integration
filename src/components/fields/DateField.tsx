import React, { useState } from 'react'
import { View, Text, Pressable, Platform } from 'react-native'
import DatePicker from 'react-datepicker'
import DateTimePicker from '@react-native-community/datetimepicker'
import "react-datepicker/dist/react-datepicker.css"

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

    const handleChange = (date: Date | null) => {
        if (date) {
            onChange(date)
        }
    }

    const formattedDate = value
        ? displayFormat
            ? displayFormat(value)
            : value.toDateString()
        : placeholder

    return (
        <View className="mb-4">
            {Platform.OS === 'web' ? (
                <DatePicker
                    selected={value}
                    onChange={(date: Date | null) => handleChange(date)}
                    minDate={minDate}
                    maxDate={maxDate}
                    dateFormat="yyyy-MM-dd"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-white text-black"
                />
            ) : (
                <>
                    {/* Native Date Picker for Android/iOS */}
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
                            display="default"
                            onChange={(_: any, selectedDate: any) => {
                                setShowPicker(false)
                                if (selectedDate) {
                                    handleChange(selectedDate)
                                }
                            }}
                            minimumDate={minDate}
                            maximumDate={maxDate}
                        />
                    )}
                </>
            )}
        </View>
    )
}
