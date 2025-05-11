import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  FlatList,
  Text,
  Platform,
  Pressable,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Message } from '../../types/chat';
import { ChatBubble } from '../../components/chat/ChatBubble';
import { ChatInput } from '../../components/chat/ChatInput';
import Animated, {
  FadeIn,
  FadeOut,
  Layout,
} from 'react-native-reanimated';
import { Image } from 'expo-image';
import Icon from 'react-native-vector-icons/FontAwesome';

const HEADER_HEIGHT = 60;
const ASSISTANT_AVATAR = 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const flatListRef = useRef<FlatList>(null);
  const windowHeight = Dimensions.get('window').height;

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
        content: "I'm an AI assistant designed to help you with various tasks. I can provide information, answer questions, help with analysis, and engage in meaningful conversations across a wide range of topics. What would you like to know?",
        role: 'assistant',
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = useCallback((messageId: string) => {
    const message = messages.find(m => m.id === messageId);
    if (message) {
      if (Platform.OS === 'web') {
        navigator.clipboard.writeText(message.content);
      }
      setCopied(messageId);
      setTimeout(() => setCopied(null), 2000);
    }
  }, [messages]);

  const handleRefresh = useCallback(() => {
    setMessages([]);
  }, []);

  const renderHeader = () => (
    <Animated.View
      entering={FadeIn}
      className={`h-[${HEADER_HEIGHT}px] bg-white border-b border-gray-200 justify-center ${Platform.OS === 'web' ? 'shadow-lg' : ''
        }`}
    >
      <View className="flex flex-row items-center justify-between px-4">
        <Icon name="bars" size={24} color="#374151" />
        <Text className="text-lg font-semibold text-gray-900">Chat Assistant</Text>
        <Icon name="sparkles" size={24} color="#6366F1" />
      </View>
    </Animated.View>
  );

  const renderEmptyState = () => (
    <Animated.View
      entering={FadeIn}
      className="flex justify-center items-center px-6"
      style={{ height: windowHeight - HEADER_HEIGHT - 100 }}
    >
      <Image
        source={ASSISTANT_AVATAR}
        className="w-30 h-30 rounded-full mb-6"
        contentFit="cover"
      />
      <Text className="text-2xl font-semibold text-gray-900 mb-2 text-center">How can I help you today?</Text>
      <Text className="text-lg text-gray-500 text-center">Ask me anything - I'm here to assist!</Text>
    </Animated.View>
  );

  const renderMessageActions = useCallback((messageId: string) => (
    <View className="flex flex-row items-center justify-end pt-1 gap-2">
      <Pressable
        onPress={() => handleCopy(messageId)}
        className="p-2 rounded-lg bg-gray-100"
      >
        {copied === messageId ? (
          <Icon name="check" size={16} color="#22C55E" />
        ) : (
          <Icon name="copy" size={16} color="#6B7280" />
        )}
      </Pressable>
    </View>
  ), [copied, handleCopy]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      {renderHeader()}

      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Animated.View
            entering={FadeIn}
            layout={Layout.springify()}
            className="mb-3"
          >
            <ChatBubble
              message={item}
              renderActions={() => renderMessageActions(item.id)}
            />
          </Animated.View>
        )}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
        onLayout={() => flatListRef.current?.scrollToEnd()}
        ListEmptyComponent={renderEmptyState}
      />

      {messages.length > 0 && (
        <Pressable
          onPress={handleRefresh}
          className="absolute bottom-24 self-center flex flex-row items-center bg-gray-100 px-6 py-2 rounded-full gap-2"
        >
          <Icon name="sync-alt" size={16} color="#6366F1" />
          <Text className="text-sm font-medium text-indigo-600">Clear Chat</Text>
        </Pressable>
      )}

      <Animated.View
        entering={FadeIn}
        exiting={FadeOut}
        className="border-t border-gray-200 bg-white"
      >
        <ChatInput onSend={handleSend} loading={loading} />
      </Animated.View>
    </SafeAreaView>
  );
}
