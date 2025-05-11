import React, { useState } from 'react';
import { View, Text, Pressable, Platform, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Animated, { useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Feather';

const SIDEBAR_WIDTH = 280;
const COLLAPSED_WIDTH = 70;

export function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(Platform.OS === 'web');
  const navigation = useNavigation();

  const sidebarStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(isExpanded ? SIDEBAR_WIDTH : COLLAPSED_WIDTH, {
        damping: 20,
        stiffness: 200,
      }),
    };
  });

  const menuItems = [
    {
      icon: 'message-square',
      label: 'Chat',
      route: 'ChatScreen',
      description: 'Start a conversation with AI'
    },
    {
      icon: 'user',
      label: 'Profile',
      route: 'ProfileScreen',
      description: 'Manage your account'
    },
    {
      icon: 'credit-card',
      label: 'Subscription',
      route: 'SubscriptionScreen',
      description: 'Manage your plan'
    },
  ];

  const renderMenuItem = ({ icon, label, route, description }) => {
    return (
      <Pressable
        key={route}
        onPress={() => navigation.navigate(route)}
        style={({ pressed }) => [
          styles.menuItem,
          pressed && styles.pressedMenuItem,
        ]}
      >
        <Icon
          name={icon}
          size={24}
          color="#64748B"
          style={styles.menuIcon}
        />
        <Animated.View
          style={[
            styles.menuContent,
            {
              opacity: withTiming(isExpanded ? 1 : 0),
              display: isExpanded ? 'flex' : 'none',
            },
          ]}
        >
          <Text style={[styles.menuLabel, styles.activeMenuLabel]}>
            {label}
          </Text>
          <Text style={styles.menuDescription}>{description}</Text>
        </Animated.View>
      </Pressable>
    );
  };

  if (Platform.OS !== 'web') {
    return null;
  }

  return (
    <Animated.View style={[styles.sidebar, sidebarStyle]}>
      <View style={styles.header}>
        <Pressable
          onPress={() => setIsExpanded(!isExpanded)}
          style={styles.toggleButton}
        >
          {isExpanded ? (
            <Icon name="chevron-left" size={24} color="#64748B" />
          ) : (
            <Icon name="menu" size={24} color="#64748B" />
          )}
        </Pressable>
      </View>

      <View style={styles.menuContainer}>
        {menuItems.map(renderMenuItem)}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    backgroundColor: '#FFFFFF',
    borderRightWidth: 1,
    borderRightColor: '#E2E8F0',
    height: '100vh',
    overflow: 'hidden',
  },
  header: {
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  toggleButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
  },
  menuContainer: {
    paddingVertical: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginHorizontal: 8,
    marginVertical: 4,
    borderRadius: 12,
    backgroundColor: 'transparent',
  },
  pressedMenuItem: {
    opacity: 0.7,
  },
  menuIcon: {
    marginRight: 12,
  },
  menuContent: {
    flex: 1,
  },
  menuLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#64748B',
  },
  activeMenuLabel: {
    color: '#6366F1',
  },
  menuDescription: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 2,
  },
});
