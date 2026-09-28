import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import { COLORS } from '../lib/constants';

type AccountScreenProps = {
  onCartPress: () => void;
  isLoggedIn: boolean;
  userName?: string;
  userEmail?: string;
  onLoginPress: () => void;
  onLogoutPress: () => void;
};

const ACCOUNT_ROWS: { label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { label: 'Đơn hàng của tôi', icon: 'receipt-outline' },
  { label: 'Sách yêu thích', icon: 'heart-outline' },
  { label: 'Cài đặt tài khoản', icon: 'settings-outline' },
];

export default function AccountScreen({
  onCartPress,
  isLoggedIn,
  userName,
  userEmail,
  onLoginPress,
  onLogoutPress,
}: AccountScreenProps) {
  return (
    <View style={styles.screen}>
      <Header title="Tài khoản" onCartPress={onCartPress} />
      <View style={styles.content}>
        {isLoggedIn ? (
          <>
            <View style={styles.avatar}>
              <Ionicons name="person" size={42} color={COLORS.indigo} />
            </View>
            <Text style={styles.name}>{userName ?? 'Bạn đọc BookStore'}</Text>
            <Text style={styles.email}>{userEmail ?? 'reader@bookstore.vn'}</Text>
            {ACCOUNT_ROWS.map((item) => (
              <View style={styles.row} key={item.label}>
                <Ionicons name={item.icon} size={22} color={COLORS.indigo} />
                <Text style={styles.rowText}>{item.label}</Text>
                <Ionicons name="chevron-forward" size={20} color={COLORS.muted} />
              </View>
            ))}
            <Pressable style={styles.primaryButton} onPress={onLogoutPress}>
              <Text style={styles.primaryButtonText}>Đăng xuất</Text>
            </Pressable>
          </>
        ) : (
          <View style={styles.guestCard}>
            <View style={styles.avatar}>
              <Ionicons name="lock-closed" size={34} color={COLORS.indigo} />
            </View>
            <Text style={styles.name}>Bạn chưa đăng nhập</Text>
            <Text style={styles.email}>Đăng nhập để xem đơn hàng và đồng bộ tài khoản.</Text>
            <Pressable style={styles.primaryButton} onPress={onLoginPress}>
              <Text style={styles.primaryButtonText}>Đăng nhập thử</Text>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { padding: 20, alignItems: 'center' },
  guestCard: { width: '100%', alignItems: 'center' },
  avatar: {
    width: 86,
    height: 86,
    borderRadius: 43,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.pale,
    marginTop: 12,
  },
  name: { marginTop: 12, color: COLORS.text, fontSize: 20, fontWeight: '800' },
  email: { marginTop: 4, color: COLORS.muted, fontSize: 14, marginBottom: 27, textAlign: 'center' },
  row: {
    width: '100%',
    height: 58,
    borderBottomWidth: 1,
    borderColor: COLORS.line,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rowText: { flex: 1, color: COLORS.text, fontSize: 16, fontWeight: '600' },
  primaryButton: {
    width: '100%',
    height: 48,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.indigo,
    marginTop: 12,
  },
  primaryButtonText: { color: '#fff', fontWeight: '800', fontSize: 15 },
});
