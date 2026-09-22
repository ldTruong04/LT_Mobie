import React from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';

const COLORS = { indigo: '#4F46E5' };

export default function CategoryChips({ categories, selected, onSelect }: any) {
  return (
    <View style={styles.chips}>
      {categories.map((category: string) => (
        <Pressable
          key={category}
          onPress={() => onSelect(category)}
          style={[styles.chip, selected === category && styles.chipSelected]}
        >
          <Text style={[styles.chipText, selected === category && styles.chipTextSelected]}>{category}</Text>
        </Pressable>
      ))}
    </View>
  );
}

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
