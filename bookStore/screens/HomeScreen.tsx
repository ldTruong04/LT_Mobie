import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';
import CategoryChips from '../components/CategoryChips';
import BookGrid from '../components/BookGrid';
import FloatingCart from '../components/FloatingCart';
import { Book, CATEGORY_FILTERS, COLORS, filterBooks } from '../lib/constants';

type HomeScreenProps = {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  onBookPress: (book: Book) => void;
  onCartPress: () => void;
  cartCount: number;
};

export default function HomeScreen({
  selectedCategory,
  onSelectCategory,
  onBookPress,
  onCartPress,
  cartCount,
}: HomeScreenProps) {
  const books = useMemo(() => filterBooks(selectedCategory), [selectedCategory]);

  const header = useMemo(
    () => (
      <View>
        <Text style={styles.welcome}>Khám phá sách hay mỗi ngày</Text>
        <Text style={styles.sectionTitle}>Danh mục</Text>
        <CategoryChips
          categories={CATEGORY_FILTERS}
          selected={selectedCategory}
          onSelect={onSelectCategory}
        />
        <View style={styles.sectionHeading}>
          <Text style={styles.sectionTitle}>Sách nổi bật</Text>
          <Text style={styles.seeAll}>Xem tất cả</Text>
        </View>
      </View>
    ),
    [selectedCategory, onSelectCategory],
  );

  return (
    <View style={styles.screen}>
      <Header onCartPress={onCartPress} />
      <BookGrid
        books={books}
        onPress={onBookPress}
        ListHeaderComponent={header}
        contentContainerStyle={styles.content}
      />
      <FloatingCart count={cartCount} onPress={onCartPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, position: 'relative' },
  content: { padding: 16, paddingBottom: 110 },
  welcome: { fontSize: 15, color: COLORS.muted, marginBottom: 20 },
  sectionTitle: { color: COLORS.text, fontSize: 20, fontWeight: '800', marginBottom: 12 },
  sectionHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  seeAll: { color: COLORS.indigo, fontWeight: '600', marginBottom: 12 },
});
