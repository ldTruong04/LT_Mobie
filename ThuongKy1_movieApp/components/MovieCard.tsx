import React, { memo } from 'react';
import {Dimensions,Image, StyleSheet,Text,TouchableOpacity,View,} from 'react-native';

export type Movie = {
  id: string;
  title: string;
  genre: string;
  year: number;
  rating: number;
  poster: string;
  isShowing: boolean;
};

export type MovieCardProps = {
  movie: Movie;
  layout?: 'row' | 'tile';
  onSelect: (id: string) => void;
};

const SCREEN_PADDING = 16;
const COLUMN_GAP = 10;
const TILE_WIDTH =
  (Dimensions.get('window').width - SCREEN_PADDING * 2 - COLUMN_GAP) / 2;

function MovieCard({ movie, layout = 'row', onSelect }: MovieCardProps) {
  const isTile = layout === 'tile';

  return (
    <TouchableOpacity
      style={[styles.card, isTile ? styles.tile : styles.row]}
      onPress={() => onSelect(movie.id)}
      activeOpacity={0.7}
    >
      <Image
        source={{ uri: movie.poster }}
        style={isTile ? styles.posterTile : styles.posterRow}
      />
      <View style={styles.info}>
        <Text style={styles.text} numberOfLines={isTile ? 2 : undefined}>
          title: {movie.title}
        </Text>
        <Text style={styles.text} numberOfLines={1}>
          thể loại: {movie.genre}
        </Text>
        <Text style={styles.text}>năm: {movie.year}</Text>
        <Text style={styles.text}>rating: ⭐ {movie.rating.toFixed(1)}</Text>
        <Text style={styles.text}>
          trạng thái: {movie.isShowing ? '✅' : '❌'}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default memo(MovieCard);

const styles = StyleSheet.create({
  card: {
    padding: 10,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tile: {
    flexDirection: 'column',
    width: TILE_WIDTH,
    height: 280,
    borderWidth: 1,
    borderRadius: 8,
  },
  posterRow: {
    width: 70,
    height: 100,
    marginRight: 12,
  },
  posterTile: {
    width: '100%',
    height: 120,
    marginBottom: 8,
    borderRadius: 4,
  },
  info: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  text: {
    fontSize: 13,
    marginBottom: 4,
  },
});
