import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import MovieCard, { Movie } from './components/MovieCard';

const API_URL = 'https://68d3ef62214be68f8c67c74c.mockapi.io/movie';

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isTile, setIsTile] = useState(false);

  const numColumns = isTile ? 2 : 1;
  const layout = isTile ? 'tile' : 'row';

  const fetchMovies = useCallback(async () => {
    const response = await fetch(API_URL);
    const data: Movie[] = await response.json();
    setMovies(data);
  }, []);

  useEffect(() => {
    fetchMovies().finally(() => setLoading(false));
  }, [fetchMovies]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await fetchMovies();
    } finally {
      setRefreshing(false);
    }
  }, [fetchMovies]);

  const handleSelect = useCallback(
    (id: string) => {
      const movie = movies.find((item) => item.id === id);
      if (movie) {
        Alert.alert(movie.title);
      }
    },
    [movies],
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Movie App</Text>
        <View style={styles.chuyenDoi}>
          <Switch value={isTile} onValueChange={setIsTile} />
        </View>
      </View>

      <FlatList
        key={String(numColumns)}
        data={movies}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        columnWrapperStyle={isTile ? styles.columnWrapper : undefined}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => (
          <MovieCard movie={item} layout={layout} onSelect={handleSelect} />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { marginBottom: 12 },
  heading: { fontSize: 20, fontWeight: 'bold', marginBottom: 8 },
  chuyenDoi: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
 
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 10,
    gap: 10,
  },
});
