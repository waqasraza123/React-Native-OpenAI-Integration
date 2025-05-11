import React, { useState } from 'react';
import { View, TextInput, Pressable, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ChatInputProps {
  onSend: (message: string) => void;
  loading?: boolean;
}

export function ChatInput({ onSend, loading }: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() && !loading) {
      onSend(message.trim());
      setMessage('');
    }
  };

  return (
    <View className="p-4 border-t border-border bg-white">
      <View className="flex-row items-end space-x-2">
        <TextInput
          className="flex-1 min-h-[44px] max-h-[120px] px-4 py-2.5 bg-surface-secondary rounded-2xl text-base text-gray-900"
          placeholder="Type a message..."
          value={message}
          onChangeText={setMessage}
          multiline
          onSubmitEditing={handleSend}
          editable={!loading}
          placeholderTextColor="#94A3B8"
        />
        <Pressable
          onPress={handleSend}
          disabled={!message.trim() || loading}
          className={`w-11 h-11 rounded-full items-center justify-center ${
            message.trim() && !loading ? 'bg-primary-500' : 'bg-gray-200'
          }`}
        >
          {loading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Ionicons
              name="send"
              size={20}
              color={message.trim() ? '#fff' : '#94A3B8'}
            />
          )}
        </Pressable>
      </View>
    </View>
  );
}