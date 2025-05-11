import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Sidebar } from '../navigation/Sidebar';

export function MainLayout({ children }) {
  return (
    <View style={styles.container}>
      <Sidebar />
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
  },
  content: {
    flex: 1,
    height: Platform.OS === 'web' ? '100vh' : '100%',
  },
});