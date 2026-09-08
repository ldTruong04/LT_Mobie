import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        
        <Text style={styles.logo}>
          BookStore
        </Text>

        <View style={styles.headerIcons}>
          <Ionicons name="search"/>

          <Ionicons name="cart-outline"/>
        </View>

      </View>
      <View style={styles.card}>



        <View style={styles.info}>

          <Text style={styles.title} >
            Đắc Nhân Tâm
          </Text>

          <Text style={styles.author}>
            Dale Carnegie
          </Text>

          <Text style={styles.price}>
            89.000đ
          </Text>

        </View>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    height: 56,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'red',
  },

  logo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },

  headerIcons: {
    flexDirection: 'row',
    gap: 16,
  },
   card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
  },
  info: {
    flex: 1,
    marginLeft: 12,

    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  title: {
    fontSize: 18,
    
  },
  author: {
    marginTop: 8,
  },
  price: {
    fontSize: 17,
  },
});