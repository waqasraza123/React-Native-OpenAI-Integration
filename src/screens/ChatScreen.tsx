import React, { useState, useRef } from 'react';
import { View, FlatList, Text, StyleSheet, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Message } from '../types/chat';
import { ChatInput } from '../components/chat/ChatInput';
import { ChatBubble } from '../components/chat/ChatBubble';

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
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Chat Assistant</Text>
      </View>
      
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <ChatBubble message={item} />}
        contentContainerStyle={styles.chatContainer}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
        onLayout={() => flatListRef.current?.scrollToEnd()}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Start a conversation!</Text>
            <Text style={styles.emptySubtext}>Ask me anything...</Text>
          </View>
        )}
      />
      
      <ChatInput onSend={handleSend} loading={loading} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
      },
    }),
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1E293B',
    textAlign: 'center',
  },
  chatContainer: {
    padding: 16,
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '40%',
  },
  emptyText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#94A3B8',
  },
});