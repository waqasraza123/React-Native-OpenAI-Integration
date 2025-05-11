import React, { useState } from 'react';
import {
  View,
  TextInput,
  Pressable,
  ActivityIndicator,
  StyleSheet,
  Platform,
} from 'react-native';
import { Send, Sparkles } from 'lucide-react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

interface ChatInputProps {
  onSend: (message: string) => void;
  loading?: boolean;
}

export function ChatInput({ onSend, loading }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const [height, setHeight] = useState(24);

  const handleSend = () => {
    if (message.trim() && !loading) {
      onSend(message.trim());
      setMessage('');
      setHeight(24);
    }
  };

  const animatedHeight = useAnimatedStyle(() => ({
    height: withSpring(Math.min(120, Math.max(44, height + 20)), {
      damping: 20,
      stiffness: 300,
    }),
  }));

  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <Pressable style={styles.suggestionButton}>
          <Sparkles size={20} color="#6366F1" />
        </Pressable>
        
        <Animated.View style={[styles.inputContainer, animatedHeight]}>
          <TextInput
            style={styles.input}
            placeholder="Message ChatGPT..."
            value={message}
            onChangeText={setMessage}
            multiline
            onContentSizeChange={(e) => 
              setHeight(e.nativeEvent.contentSize.height)
            }
            editable={!loading}
            placeholderTextColor="#94A3B8"
          />
        </Animated.View>

        <Pressable
          onPress={handleSend}
          disabled={!message.trim() || loading}
          style={[
            styles.sendButton,
            (!message.trim() || loading) && styles.sendButtonDisabled
          ]}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" size="small" />
          ) : (
            <Send size={20} color="#FFFFFF" />
          )}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 12,
  },
  suggestionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    justifyContent: 'center',
  },
  input: {
    fontSize: 16,
    color: '#1F2937',
    paddingTop: 0,
    paddingBottom: 0,
    maxHeight: 120,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#6366F1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#E5E7EB',
  },
});