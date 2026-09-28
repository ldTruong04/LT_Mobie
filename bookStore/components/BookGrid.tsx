import React, { memo, useCallback } from 'react';
import { View, Pressable, Image, Text, StyleSheet, FlatList, ListRenderItem } from 'react-native';
import Badge from './Badge';
import { Book, COLORS, money } from '../lib/constants';

type BookGridProps = {
  books: Book[];
  onPress: (book: Book) => void;
  ListHeaderComponent?: React.ReactElement | null;
  contentContainerStyle?: object;
};

const BookCard = memo(function BookCard({
  book,
  onPress,
}: {
  book: Book;
  onPress: (book: Book) => void;
}) {
  const handlePress = useCallback(() => onPress(book), [book, onPress]);

  return (
    <Pressable style={styles.bookCard} onPress={handlePress}>
      <View style={styles.coverWrap}>
        <Image source={{ uri: book.image }} style={styles.cover} />
        {book.discount ? <Badge label={book.discount} /> : null}
      </View>
      <Text style={styles.bookTitle} numberOfLines={2}>
        {book.title}
      </Text>
      <Text style={styles.bookAuthor} numberOfLines={1}>
        {book.author}
      </Text>
      <Text style={styles.bookPrice}>{money(book.price)}</Text>
    </Pressable>
  );
});

function BookGrid({ books, onPress, ListHeaderComponent, contentContainerStyle }: BookGridProps) {
  const renderItem: ListRenderItem<Book> = useCallback(
    ({ item }) => <BookCard book={item} onPress={onPress} />,
    [onPress],
  );

  const keyExtractor = useCallback((item: Book) => String(item.id), []);

  return (
    <FlatList
      data={books}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      numColumns={2}
      columnWrapperStyle={styles.row}
      ListHeaderComponent={ListHeaderComponent}
      contentContainerStyle={[styles.content, contentContainerStyle]}
      showsVerticalScrollIndicator={false}
      initialNumToRender={6}
      windowSize={5}
      removeClippedSubviews
    />
  );
}

export default memo(BookGrid);

const styles = StyleSheet.create({
  content: { paddingBottom: 24 },
  row: { justifyContent: 'space-between', marginBottom: 20 },
  bookCard: { width: '48%' },
  coverWrap: {
    position: 'relative',
    width: '100%',
    aspectRatio: 0.72,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#E2E8F0',
  },
  cover: { width: '100%', height: '100%' },
  bookTitle: {
    marginTop: 9,
    color: COLORS.text,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '700',
    minHeight: 40,
  },
  bookAuthor: { marginTop: 3, color: COLORS.muted, fontSize: 12 },
  bookPrice: { marginTop: 6, color: COLORS.red, fontSize: 15, fontWeight: '800' },
});
