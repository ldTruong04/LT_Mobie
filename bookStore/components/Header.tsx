import React, { memo } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../lib/constants';

type HeaderProps = {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  onCartPress?: () => void;
};

function Header({ title = 'BookStore', showBack, onBack, onCartPress }: HeaderProps) {
  return (
    <View style={styles.header}>
      {showBack ? (
        <Pressable style={styles.headerButton} onPress={onBack} hitSlop={8}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </Pressable>
      ) : (
        <Text style={styles.logo}>{title}</Text>
      )}
      {showBack && <Text style={styles.headerTitle}>{title}</Text>}
      <View style={styles.headerIcons}>
        {!showBack && <Ionicons name="search-outline" size={25} color="#fff" />}
        <Pressable onPress={onCartPress} hitSlop={8} disabled={!onCartPress}>
          <Ionicons name="cart-outline" size={26} color="#fff" />
        </Pressable>
      </View>
    </View>
  );
}

export default memo(Header);

const styles = StyleSheet.create({
  header: {
    height: 56,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.navy,
  },
  logo: { fontSize: 22, fontWeight: '800', color: '#fff' },
  headerTitle: { flex: 1, marginLeft: 10, color: '#fff', fontSize: 18, fontWeight: '700' },
  headerButton: { padding: 4 },
  headerIcons: { flexDirection: 'row', alignItems: 'center', gap: 16 },
});
