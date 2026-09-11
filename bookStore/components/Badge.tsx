import React from 'react';
import { View, Text } from 'react-native';

export default function Badge({ label, styles }: any) {
  return (
    <View style={styles.badge}>
      <Text style={styles.badgeText}>{label}</Text>
    </View>
  );
}
