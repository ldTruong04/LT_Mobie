import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Header({ title = 'BookStore', showBack, onBack, styles }: any) {
  return (
    <View style={styles.header}>
      {showBack ? (
        <Pressable style={styles.headerButton} onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </Pressable>
      ) : (
        <Text style={styles.logo}>{title}</Text>
      )}
      {showBack && <Text style={styles.headerTitle}>{title}</Text>}
      <View style={styles.headerIcons}>
        {!showBack && <Ionicons name="search-outline" size={25} color="#fff" />}
        <Ionicons name="cart-outline" size={26} color="#fff" />
      </View>
    </View>
  );
}
