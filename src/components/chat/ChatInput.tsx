import React, { useState } from 'react';
import { View, TextInput, Pressable, ActivityIndicator } from 'react-native';
import { Send } from 'lucide-react-native';

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
    <View className="p-4 border-t border-gray-200 bg-white">
      <View className="flex-row items-end space-x-2">
        <TextInput
          className="flex-1 min-h-[40px] max-h-[120px] px-4 py-2 bg-surface rounded-2xl text-base text-gray-900"
          placeholder="Type a message..."
          value={message}
          onChangeText={setMessage}
          multiline
          onSubmitEditing={handleSend}
          editable={!loading}
        />
        <Pressable
          onPress={handleSend}
          disabled={!message.trim() || loading}
          className={`w-10 h-10 rounded-full items-center justify-center ${
            message.trim() && !loading ? 'bg-primary' : 'bg-gray-200'
          }`}
        >
          {loading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Send
              size={20}
              color={message.trim() ? '#fff' : '#666'}
            />
          )}
        </Pressable>
      </View>
    </View>
  );
}