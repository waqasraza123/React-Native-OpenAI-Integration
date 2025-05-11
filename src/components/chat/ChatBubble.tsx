import React from 'react';
import { View, Text } from 'react-native';
import { Message } from '../../types/chat';

interface ChatBubbleProps {
  message: Message;
}

export function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <View
      className={`flex-row mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <View
        className={`px-5 py-3.5 rounded-2xl max-w-[80%] ${
          isUser
            ? 'bg-primary-500 rounded-tr-sm'
            : 'bg-surface-secondary rounded-tl-sm'
        }`}
      >
        <Text
          className={`text-base ${
            isUser ? 'text-white' : 'text-gray-900'
          }`}
        >
          {message.content}
        </Text>
      </View>
    </View>
  );
}