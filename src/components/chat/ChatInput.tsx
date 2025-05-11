import React, { useState } from 'react';
import {
  View,
  TextInput,
  Pressable,
  ActivityIndicator,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
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
    <View className="p-4 bg-white">
      <View className="flex flex-row items-end gap-3">
        <Pressable className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
          <Icon name="zap" size={20} color="#6366F1" />
        </Pressable>

        <Animated.View
          className="flex-1 bg-gray-100 rounded-xl px-4 py-2 justify-center"
          style={animatedHeight}
        >
          <TextInput
            className={`
              text-base text-gray-800 pb-0 pt-0 max-h-30
              rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600
              ${Platform.OS === 'web' ? 'border border-gray-300' : ''}
              px-3 py-2
            `}
            placeholder="Message ChatGPT..."
            value={message}
            onChangeText={setMessage}
            multiline
            onContentSizeChange={(e) => setHeight(e.nativeEvent.contentSize.height)}
            editable={!loading}
            placeholderTextColor="#94A3B8"
          />
        </Animated.View>

        <Pressable
          onPress={handleSend}
          disabled={!message.trim() || loading}
          className={`w-10 h-10 rounded-full flex items-center justify-center ${!message.trim() || loading ? 'bg-gray-300' : 'bg-indigo-600'
            }`}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" size="small" />
          ) : (
            <Icon name="send" size={20} color="#FFFFFF" />
          )}
        </Pressable>
      </View>
    </View>
  );
}
