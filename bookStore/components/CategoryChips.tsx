import React, { memo, useCallback } from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import { COLORS } from '../lib/constants';

type CategoryChipsProps = {
  categories: readonly string[];
  selected: string;
  onSelect: (category: string) => void;
};

function CategoryChips({ categories, selected, onSelect }: CategoryChipsProps) {
  return (
    <View style={styles.chips}>
      {categories.map((category) => (
        <Chip
          key={category}
          category={category}
          selected={selected === category}
          onSelect={onSelect}
        />
      ))}
    </View>
  );
}

const Chip = memo(function Chip({
  category,
  selected,
  onSelect,
}: {
  category: string;
  selected: boolean;
  onSelect: (category: string) => void;
}) {
  const handlePress = useCallback(() => onSelect(category), [category, onSelect]);

  return (
    <Pressable
      onPress={handlePress}
      style={[styles.chip, selected && styles.chipSelected]}
    >
      <Text style={[styles.chipText, selected && styles.chipTextSelected]}>{category}</Text>
    </Pressable>
  );
});

export default memo(CategoryChips);

const styles = StyleSheet.create({
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    borderWidth: 1,
    borderColor: COLORS.indigo,
    borderRadius: 999,
    paddingHorizontal: 13,
    paddingVertical: 7,
    backgroundColor: '#fff',
  },
  chipSelected: { backgroundColor: COLORS.indigo },
  chipText: { color: COLORS.indigo, fontSize: 13, fontWeight: '600' },
  chipTextSelected: { color: '#fff' },
});
