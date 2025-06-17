import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ThemedText } from './ThemedText';

export default function SensorCard({ sensor, onPress }: { sensor: any, onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={{ flex: 1 }}>
        <ThemedText type="subtitle">{sensor.name}</ThemedText>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginTop: 4 }}>
          <Text style={styles.value}>{sensor.value}</Text>
          <Text style={styles.unit}>{sensor.unit}</Text>
        </View>
        <Text style={[styles.status, sensor.status === 'OK' ? styles.ok : styles.alert]}>
          {sensor.status}
        </Text>
      </View>
      <MaterialIcons name="chevron-right" size={28} color="#b0b0b0" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff', borderRadius: 16, padding: 20, flexDirection: 'row',
    alignItems: 'center', justifyContent: 'space-between', elevation: 2,
    shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 8, marginBottom: 0,
  },
  value: { fontSize: 22, fontWeight: 'bold', color: '#222' },
  unit: { fontSize: 14, color: '#888', marginLeft: 4 },
  status: { fontWeight: 'bold', fontSize: 14, marginTop: 4 },
  ok: { color: '#234366' },
  alert: { color: '#d9534f' },
});