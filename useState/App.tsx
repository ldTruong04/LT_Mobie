import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const rows = ['A', 'B', 'C', 'D'];
  const seatNumbers = [1, 2, 3, 4, 5, 6, 7, 8];

  const toggleSeat = (seatId: string) => {
    setSelectedSeats((currentSeats) =>
      currentSeats.includes(seatId)
        ? currentSeats.filter((seat) => seat !== seatId)
        : [...currentSeats, seatId]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đặt vé xem phim</Text>
      <Text>Bấm vào ghế để đổi màu.</Text>

      <View style={styles.screen}>
        <Text>Màn hình</Text>
      </View>

      <View style={styles.seatMap}>
        {rows.map((row) => (
          <View key={row} style={styles.seatRow}>
            {seatNumbers.map((number) => {
              const seatId = `${row}${number}`;
              const isSelected = selectedSeats.includes(seatId);

              return (
                <Pressable key={seatId} onPress={() => toggleSeat(seatId)} style={({ pressed }) => [styles.seat, isSelected && styles.seatSelected]}>
                  <Text>{seatId}</Text>
                </Pressable>
              );
            })}
          </View>
        ))}
      </View>

      <Text>
        Ghế đã chọn: {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'Chưa có'}
      </Text>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    paddingTop: 64,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111',
    marginBottom: 6,
  },
  screen: {
    height: 40,
    borderRadius: 10,
    backgroundColor: '#cfd8e3',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
  },
  seatMap: {
    gap: 12,
  },
  seatRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  seat: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#d9d9d9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  seatPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.97 }],
  },
  seatSelected: {
    backgroundColor: '#4caf50',
  },

});
