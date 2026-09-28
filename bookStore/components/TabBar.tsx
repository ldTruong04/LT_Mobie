import React, { memo, useMemo } from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { COLORS } from '../lib/constants';
import { useCart } from '../hooks/useCart';

const TAB_META = {
  HomeTab: { label: 'Trang chủ', icon: 'home-outline' },
  CategoriesTab: { label: 'Danh mục', icon: 'grid-outline' },
  CartTab: { label: 'Giỏ hàng', icon: 'cart-outline' },
  AccountTab: { label: 'Tài khoản', icon: 'person-outline' },
} as const;

function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { totalQuantity } = useCart();
  const badgeLabel = useMemo(() => (totalQuantity > 99 ? '99+' : String(totalQuantity)), [totalQuantity]);

  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const isActive = state.index === index;
        const options = descriptors[route.key].options;
        const meta = TAB_META[route.name as keyof typeof TAB_META];
        const label =
          typeof options.tabBarLabel === 'string'
            ? options.tabBarLabel
            : typeof options.title === 'string'
              ? options.title
              : meta.label;
        const badge = route.name === 'CartTab' && totalQuantity > 0 ? badgeLabel : null;

        const handlePress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isActive && !event.defaultPrevented) {
            navigation.navigate(route.name as never);
          }
        };

        return (
          <Pressable key={route.key} style={styles.tab} onPress={handlePress}>
            <View>
              {badge ? (
                <View style={styles.tabCount}>
                  <Text style={styles.tabCountText}>{badge}</Text>
                </View>
              ) : null}
              <Ionicons
                name={meta.icon as keyof typeof Ionicons.glyphMap}
                size={23}
                color={isActive ? COLORS.indigo : COLORS.muted}
              />
            </View>
            <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>{label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export default memo(TabBar);

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
