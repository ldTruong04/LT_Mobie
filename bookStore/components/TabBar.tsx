import React from 'react';
import { View, Pressable, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TabBar({ active, onChange, cartCount, styles, COLORS }: any) {
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
