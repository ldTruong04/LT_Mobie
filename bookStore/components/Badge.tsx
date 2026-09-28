import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../lib/constants';

type BadgeProps = {
  label: string;
};

function Badge({ label }: BadgeProps) {
  return (
    <View style={styles.badge}>
      <Text style={styles.badgeText}>{label}</Text>
    </View>
  );
}

export default memo(Badge);

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
