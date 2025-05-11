import React, { useState } from 'react';
import { View, Text, Pressable, Platform, StyleSheet, Dimensions } from 'react-native';
import { useNavigation, usePathname } from 'expo-router';
import Animated, { 
  useAnimatedStyle, 
  withSpring, 
  withTiming,
  interpolate
} from 'react-native-reanimated';
import { MessageSquare, User, CreditCard, Settings, ChevronLeft, Menu } from 'lucide-react-native';

const SIDEBAR_WIDTH = 280;
const COLLAPSED_WIDTH = 70;

export function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(Platform.OS === 'web');
  const navigation = useNavigation();
  const pathname = usePathname();

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
      icon: MessageSquare, 
      label: 'Chat', 
      route: '/chat',
      description: 'Start a conversation with AI'
    },
    { 
      icon: User, 
      label: 'Profile', 
      route: '/profile',
      description: 'Manage your account'
    },
    { 
      icon: CreditCard, 
      label: 'Subscription', 
      route: '/subscription',
      description: 'Manage your plan'
    },
    { 
      icon: Settings, 
      label: 'Settings', 
      route: '/settings',
      description: 'App preferences'
    },
  ];

  const renderMenuItem = ({ icon: Icon, label, route, description }) => {
    const isActive = pathname === route;
    
    return (
      <Pressable
        key={route}
        onPress={() => navigation.navigate(route)}
        style={({ pressed }) => [
          styles.menuItem,
          isActive && styles.activeMenuItem,
          pressed && styles.pressedMenuItem,
        ]}
      >
        <Icon 
          size={24} 
          color={isActive ? '#6366F1' : '#64748B'} 
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
          <Text style={[styles.menuLabel, isActive && styles.activeMenuLabel]}>
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
            <ChevronLeft size={24} color="#64748B" />
          ) : (
            <Menu size={24} color="#64748B" />
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
  activeMenuItem: {
    backgroundColor: '#EEF2FF',
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