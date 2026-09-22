import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const COLORS = { red: '#E85D4A' };

export default function Badge({ label }: any) {
  return (
    <View style={styles.badge}>
      <Text style={styles.badgeText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: 7,
    left: 7,
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: COLORS.red,
  },
  badgeText: { color: '#fff', fontSize: 11, fontWeight: '800' },
});
