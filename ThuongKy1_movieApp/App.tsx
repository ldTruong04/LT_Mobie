import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const API_URL = 'https://68d3ef62214be68f8c67c74c.mockapi.io/movie';

type Movie = {
  id: string;
  title: string;
  rating: number;
  poster: string;
  isShowing: boolean;
};

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data: Movie[]) => setMovies(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Danh sách phim</Text>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.poster }} style={styles.poster} />
            <View style={styles.info}>
              <Text style={styles.title}>{item.title}</Text>
              <Text>Rating: {item.rating}</Text>
              <Text>{item.isShowing ? 'Đang chiếu' : 'Ngừng chiếu'}</Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  heading: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  item: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  poster: { width: 70, height: 100, backgroundColor: '#eee', marginRight: 12 },
  info: { flex: 1, justifyContent: 'center' },
  title: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
});
