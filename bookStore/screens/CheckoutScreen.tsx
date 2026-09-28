import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Header from '../components/Header';
import { COLORS, money } from '../lib/constants';
import { CartStackParamList } from '../navigation/types';

export default function CheckoutScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<CartStackParamList>>();
  const route = useRoute<RouteProp<CartStackParamList, 'Checkout'>>();

  return (
    <View style={styles.screen}>
      <Header title="Thanh toán" showBack onBack={() => navigation.goBack()} />
      <View style={styles.content}>
        <Text style={styles.label}>Tổng tiền tạm tính</Text>
        <Text style={styles.total}>{money(route.params.total)}</Text>
        <Text style={styles.note}>Khung màn hình này sẽ được hoàn thiện ở tuần 9.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  label: { color: COLORS.muted, fontSize: 15, marginBottom: 8 },
  total: { color: COLORS.red, fontSize: 30, fontWeight: '900' },
  note: { marginTop: 14, color: COLORS.text, textAlign: 'center', lineHeight: 22 },
});