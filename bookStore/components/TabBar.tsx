import React from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const COLORS = { indigo: '#4F46E5', muted: '#6B7280', line: '#E5E7EB', red: '#E85D4A' };

export default function TabBar({ active, onChange, cartCount }: any) {
  const tabs = [
    { key: 'home', label: 'Trang chủ', icon: 'home-outline' },
    { key: 'categories', label: 'Danh mục', icon: 'grid-outline' },
    { key: 'cart', label: 'Giỏ hàng', icon: 'cart-outline' },
    { key: 'account', label: 'Tài khoản', icon: 'person-outline' },
  ];
  return (
    <View style={styles.tabBar}>
      {tabs.map((tab: any) => {
        const isActive = active === tab.key;
        return (
          <Pressable key={tab.key} style={styles.tab} onPress={() => onChange(tab.key)}>
            <View>
              {tab.key === 'cart' && cartCount > 0 && <View style={styles.tabCount}><Text style={styles.tabCountText}>{cartCount}</Text></View>}
              <Ionicons name={tab.icon as any} size={23} color={isActive ? COLORS.indigo : COLORS.muted} />
            </View>
            <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>{tab.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 68,
    borderTopWidth: 1,
    borderColor: COLORS.line,
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingBottom: 4,
  },
  tab: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 3 },
  tabLabel: { color: COLORS.muted, fontSize: 11, fontWeight: '600' },
  tabLabelActive: { color: COLORS.indigo },
  tabCount: {
    position: 'absolute',
    zIndex: 1,
    right: -10,
    top: -8,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.red,
  },
  tabCountText: { color: '#fff', fontSize: 9, fontWeight: '800' },
});
