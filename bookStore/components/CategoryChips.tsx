import React from 'react';
import { View, Pressable, Text } from 'react-native';

export default function CategoryChips({ categories, selected, onSelect, styles }: any) {
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
