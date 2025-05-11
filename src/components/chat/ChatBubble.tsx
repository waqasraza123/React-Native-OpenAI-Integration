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
        className={`px-4 py-3 rounded-2xl max-w-[80%] ${
          isUser
            ? 'bg-primary rounded-tr-none'
            : 'bg-surface rounded-tl-none'
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