import React, { useState, useRef } from 'react';
import { View, FlatList, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import { ChatBubble } from '../../../src/components/chat/ChatBubble';
import { ChatInput } from '../../../src/components/chat/ChatInput';
import { Message } from '../../../src/types/chat';

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const handleSend = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
    };

    setMessages(prev => [...prev, userMessage]);
    setLoading(true);

    try {
      // Simulate AI response - Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'This is a sample response. Replace with actual AI response.',
        role: 'assistant',
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1"
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <ChatBubble message={item} />}
          contentContainerClassName="px-4 py-4"
          onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
          onLayout={() => flatListRef.current?.scrollToEnd()}
        />
        <ChatInput onSend={handleSend} loading={loading} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}