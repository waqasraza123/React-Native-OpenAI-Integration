import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Message } from '../../types/chat';
import { Bot } from 'lucide-react-native';
import { Image } from 'expo-image';

const USER_AVATAR = 'https://images.pexels.com/photos/7275385/pexels-photo-7275385.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';
const ASSISTANT_AVATAR = 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';

interface ChatBubbleProps {
  message: Message;
  renderActions?: () => React.ReactNode;
}

export function ChatBubble({ message, renderActions }: ChatBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <View style={styles.container}>
      <View style={[styles.messageRow, isUser && styles.userMessageRow]}>
        <Image
          source={isUser ? USER_AVATAR : ASSISTANT_AVATAR}
          style={styles.avatar}
          contentFit="cover"
        />
        <View style={[styles.bubble, isUser ? styles.userBubble : styles.assistantBubble]}>
          <Text style={[styles.text, isUser && styles.userText]}>
            {message.content}
          </Text>
        </View>
      </View>
      {renderActions && (
        <View style={styles.actionsContainer}>
          {renderActions()}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  userMessageRow: {
    flexDirection: 'row-reverse',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
  },
  bubble: {
    maxWidth: '70%',
    padding: 16,
    borderRadius: 16,
    borderTopLeftRadius: 4,
  },
  userBubble: {
    backgroundColor: '#6366F1',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 4,
  },
  assistantBubble: {
    backgroundColor: '#F3F4F6',
  },
  text: {
    fontSize: 15,
    lineHeight: 22,
    color: '#374151',
  },
  userText: {
    color: '#FFFFFF',
  },
  actionsContainer: {
    marginTop: 4,
    paddingHorizontal: 44,
  },
});