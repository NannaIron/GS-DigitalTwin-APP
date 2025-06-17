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
    const data = require('@/mock/sensors.json');
    setSensors(data);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sensores</Text>
      <View style={styles.infoBox}>
        <FlatList
          data={sensors}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.sensorItem}
              onPress={() => router.push({ pathname: '/sensor-detail', params: { id: item.id } })}
            >
              <View style={styles.sensorInfo}>
                <Text style={styles.sensorName}>{item.name}</Text>
                <Text style={styles.sensorType}>{item.type}</Text>
              </View>
              <View style={styles.statusBox}>
                <Text style={[styles.statusText, { color: statusColors[item.status] || '#888' }]}>
                  {item.status}
                </Text>
                <MaterialIcons
                  name={statusIcons[item.status] || 'help'}
                  size={22}
                  color={statusColors[item.status] || '#888'}
                  style={{ marginLeft: 6 }}
                />
              </View>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          contentContainerStyle={{ paddingVertical: 4 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#234366', alignItems: 'center', paddingTop: 60 },
  title: { color: '#fff', fontSize: 28, fontWeight: 'bold', marginBottom: 32 },
  infoBox: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    width: '85%',
    marginBottom: 32,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
    minHeight: 120,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    flex: 1,
  },
  sensorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f7f8fa',
    borderRadius: 14,
    padding: 18,
    justifyContent: 'space-between',
    elevation: 1,
    marginBottom: 4,
  },
  sensorInfo: { flex: 1 },
  sensorName: { fontSize: 18, fontWeight: 'bold', color: '#222' },
  sensorType: { fontSize: 15, color: '#888', marginTop: 2 },
  statusBox: { flexDirection: 'row', alignItems: 'center', marginLeft: 12 },
  statusText: { fontWeight: 'bold', fontSize: 15 }
});