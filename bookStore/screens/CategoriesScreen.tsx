import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';
import CategoryChips from '../components/CategoryChips';
import BookGrid from '../components/BookGrid';
import { Book, CATEGORY_FILTERS, COLORS, filterBooks } from '../lib/constants';

type CategoriesScreenProps = {
  selected: string;
  onSelect: (category: string) => void;
  onBookPress: (book: Book) => void;
  onCartPress: () => void;
};

export default function CategoriesScreen({
  selected,
  onSelect,
  onBookPress,
  onCartPress,
}: CategoriesScreenProps) {
  const books = useMemo(() => filterBooks(selected), [selected]);

  const header = useMemo(
    () => (
      <View>
        <Text style={styles.screenIntro}>Chọn thể loại bạn yêu thích</Text>
        <CategoryChips categories={CATEGORY_FILTERS} selected={selected} onSelect={onSelect} />
        <Text style={styles.sectionTitle}>{selected}</Text>
      </View>
    ),
    [selected, onSelect],
  );

  return (
    <View style={styles.screen}>
      <Header title="Danh mục" onCartPress={onCartPress} />
      <BookGrid
        books={books}
        onPress={onBookPress}
        ListHeaderComponent={header}
        contentContainerStyle={styles.content}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { padding: 16, paddingBottom: 100 },
  screenIntro: { fontSize: 15, color: COLORS.muted, marginBottom: 14 },
  sectionTitle: { color: COLORS.text, fontSize: 20, fontWeight: '800', marginBottom: 12 },
});
