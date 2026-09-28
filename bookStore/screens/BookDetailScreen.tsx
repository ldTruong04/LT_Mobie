import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import DetailScreen from './DetailScreen';
import { useBookstore } from '../hooks/useBookstore';
import { useCart } from '../hooks/useCart';
import { COLORS } from '../lib/constants';
import { HomeStackParamList } from '../navigation/types';

export default function BookDetailScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const route = useRoute<RouteProp<HomeStackParamList, 'BookDetail'>>();
  const { getBookById } = useBookstore();
  const { addItem } = useCart();

  const book = getBookById(route.params.bookId);

  if (!book) {
    return (
      <View style={styles.emptyState}>
        <Text style={styles.emptyTitle}>Không tìm thấy sách</Text>
        <Text style={styles.emptyText}>Mã sách đã chọn không còn tồn tại trong catalog.</Text>
      </View>
    );
  }

  return <DetailScreen book={book} onBack={() => navigation.goBack()} onAdd={() => addItem(book.id)} />;
}

const styles = StyleSheet.create({
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: COLORS.background,
  },
  emptyTitle: { color: COLORS.text, fontSize: 18, fontWeight: '800' },
  emptyText: { marginTop: 8, color: COLORS.muted, textAlign: 'center', lineHeight: 22 },
});