import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const COLORS = { navy: '#172554' };

export default function Header({ title = 'BookStore', showBack, onBack }: any) {
  return (
    <View style={styles.header}>
      {showBack ? (
        <Pressable style={styles.headerButton} onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </Pressable>
      ) : (
        <Text style={styles.logo}>{title}</Text>
      )}
      {showBack && <Text style={styles.headerTitle}>{title}</Text>}
      <View style={styles.headerIcons}>
        {!showBack && <Ionicons name="search-outline" size={25} color="#fff" />}
        <Ionicons name="cart-outline" size={26} color="#fff" />
      </View>
    </View>
  );
}

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
