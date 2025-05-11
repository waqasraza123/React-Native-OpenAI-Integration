import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
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
      style={[styles.header, Platform.OS === 'web' && styles.headerShadow]}
    >
      <View style={styles.headerContent}>
        <Icon name="bars" size={24} color="#374151" />
        <Text style={styles.title}>Chat Assistant</Text>
        <Icon name="sparkles" size={24} color="#6366F1" />
      </View>
    </Animated.View>
  );

  const renderEmptyState = () => (
    <Animated.View
      entering={FadeIn}
      style={[styles.emptyContainer, { height: windowHeight - HEADER_HEIGHT - 100 }]}
    >
      <Image
        source={ASSISTANT_AVATAR}
        style={styles.assistantImage}
        contentFit="cover"
      />
      <Text style={styles.emptyTitle}>How can I help you today?</Text>
      <Text style={styles.emptySubtext}>Ask me anything - I'm here to assist!</Text>
    </Animated.View>
  );

  const renderMessageActions = useCallback((messageId: string) => (
    <View style={styles.messageActions}>
      <Pressable
        onPress={() => handleCopy(messageId)}
        style={styles.actionButton}
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
    <SafeAreaView style={styles.container}>
      {renderHeader()}

      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Animated.View
            entering={FadeIn}
            layout={Layout.springify()}
          >
            <ChatBubble
              message={item}
              renderActions={() => renderMessageActions(item.id)}
            />
          </Animated.View>
        )}
        contentContainerStyle={styles.chatContainer}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
        onLayout={() => flatListRef.current?.scrollToEnd()}
        ListEmptyComponent={renderEmptyState}
      />

      {messages.length > 0 && (
        <Pressable
          onPress={handleRefresh}
          style={styles.refreshButton}
        >
          <Icon name="sync-alt" size={16} color="#6366F1" />
          <Text style={styles.refreshText}>Clear Chat</Text>
        </Pressable>
      )}

      <Animated.View
        entering={FadeIn}
        exiting={FadeOut}
        style={styles.inputContainer}
      >
        <ChatInput onSend={handleSend} loading={loading} />
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    height: HEADER_HEIGHT,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    justifyContent: 'center',
  },
  headerShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  chatContainer: {
    padding: 16,
    flexGrow: 1,
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  assistantImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  messageActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingTop: 4,
    gap: 8,
  },
  actionButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
  },
  refreshButton: {
    position: 'absolute',
    bottom: 90,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  refreshText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6366F1',
  },
  inputContainer: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
});
