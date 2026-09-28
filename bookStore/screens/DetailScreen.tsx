import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import Badge from '../components/Badge';
import { Book, COLORS, money } from '../lib/constants';

type DetailScreenProps = {
  book: Book;
  onBack: () => void;
  onAdd: () => void;
};

export default function DetailScreen({ book, onBack, onAdd }: DetailScreenProps) {
  return (
    <View style={styles.screen}>
      <Header title="Chi tiết sách" showBack onBack={onBack} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.imageWrap}>
          <Image source={{ uri: book.image }} style={styles.image} />
          {book.discount ? <Badge label={book.discount} /> : null}
        </View>
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>{book.author}</Text>
        <View style={styles.priceRow}>
          <Text style={styles.price}>{money(book.price)}</Text>
          {book.oldPrice ? <Text style={styles.oldPrice}>{money(book.oldPrice)}</Text> : null}
        </View>
        <View style={styles.divider} />
        <Text style={styles.descriptionHeading}>Giới thiệu sách</Text>
        <Text style={styles.description}>{book.description}</Text>
      </ScrollView>
      <View style={styles.addBar}>
        <View>
          <Text style={styles.addLabel}>Tạm tính</Text>
          <Text style={styles.addPrice}>{money(book.price)}</Text>
        </View>
        <Pressable style={styles.addButton} onPress={onAdd}>
          <Ionicons name="cart-outline" size={20} color="#fff" />
          <Text style={styles.addButtonText}>Thêm vào giỏ</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  scroll: { flex: 1 },
  content: { padding: 20, paddingBottom: 30 },
  imageWrap: {
    position: 'relative',
    alignSelf: 'center',
    width: '62%',
    aspectRatio: 0.68,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#E2E8F0',
    marginBottom: 20,
  },
  image: { width: '100%', height: '100%' },
  title: { color: COLORS.text, fontSize: 25, fontWeight: '800', lineHeight: 32 },
  author: { marginTop: 6, color: COLORS.muted, fontSize: 16 },
  priceRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 14 },
  price: { color: COLORS.red, fontSize: 23, fontWeight: '800' },
  oldPrice: { color: COLORS.muted, fontSize: 15, textDecorationLine: 'line-through' },
  divider: { height: 1, backgroundColor: COLORS.line, marginVertical: 22 },
  descriptionHeading: { color: COLORS.text, fontSize: 18, fontWeight: '800', marginBottom: 8 },
  description: { color: '#4B5563', fontSize: 15, lineHeight: 23, marginBottom: 13 },
  addBar: {
    padding: 14,
    borderTopWidth: 1,
    borderColor: COLORS.line,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addLabel: { fontSize: 12, color: COLORS.muted },
  addPrice: { marginTop: 2, color: COLORS.red, fontSize: 18, fontWeight: '800' },
  addButton: {
    borderRadius: 10,
    backgroundColor: COLORS.indigo,
    paddingHorizontal: 16,
    height: 46,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
  },
  addButtonText: { color: '#fff', fontWeight: '800' },
});
