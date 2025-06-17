import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Sensor = {
  id: string;
  name: string;
  type: string;
  description: string;
  unit: string;
  value: number;
  status: string;
  statusDescription: string;
  history: number[];
};

const statusColors: Record<string, string> = {
  OK: '#28a745',
  ALERTA: '#ffc107',
  ERRO: '#d9534f'
};

const statusIcons: Record<string, string> = {
  OK: 'check-circle',
  ALERTA: 'warning',
  ERRO: 'error'
};

export default function SensorsScreen() {
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch(require('@/mock/sensors.json'))
      .then((res) => res.json?.() ?? res)
      .then(setSensors);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Sensores</Text>
      <FlatList
        data={sensors}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.sensorItem}
            onPress={() => router.push({ pathname: '/(tabs)/sensor-detail', params: { id: item.id } })}
          >
            <View style={styles.sensorInfo}>
              <Text style={styles.sensorName}>{item.name}</Text>
              <Text style={styles.sensorType}>{item.type}</Text>
            </View>
            <View style={styles.statusBox}>
              <MaterialIcons
                name={statusIcons[item.status] || 'help'}
                size={22}
                color={statusColors[item.status] || '#888'}
                style={{ marginRight: 4 }}
              />
              <Text style={[styles.statusText, { color: statusColors[item.status] || '#888' }]}>
                {item.status}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        contentContainerStyle={{ padding: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  headerTitle: { color: '#234366', fontSize: 28, fontWeight: 'bold', marginTop: 40, marginBottom: 16, textAlign: 'center' },
  sensorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f7f8fa',
    borderRadius: 14,
    padding: 18,
    justifyContent: 'space-between',
    elevation: 1
  },
  sensorInfo: { flex: 1 },
  sensorName: { fontSize: 18, fontWeight: 'bold', color: '#222' },
  sensorType: { fontSize: 15, color: '#888', marginTop: 2 },
  statusBox: { flexDirection: 'row', alignItems: 'center', marginLeft: 12 },
  statusText: { fontWeight: 'bold', fontSize: 15 }
});