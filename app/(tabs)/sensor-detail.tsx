import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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

export default function SensorDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [sensor, setSensor] = useState<Sensor | null>(null);

  useEffect(() => {
    const data: Sensor[] = require('@/mock/sensors.json');
    const found = data.find((s: Sensor) => s.id === id);
    setSensor(found || null);
  }, [id]);

  if (!sensor) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes do Sensor</Text>
      <View style={styles.infoBox}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color="#234366" />
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>
        <View style={styles.headerRow}>
          <Text style={styles.sensorName}>{sensor.name}</Text>
          <View style={styles.statusRow}>
            <Text style={[styles.statusText, { color: statusColors[sensor.status] || '#888' }]}>
              {sensor.status}
            </Text>
            <MaterialIcons
              name={statusIcons[sensor.status] || 'help'}
              size={22}
              color={statusColors[sensor.status] || '#888'}
              style={{ marginLeft: 6 }}
            />
          </View>
        </View>
        <Text style={styles.statusDesc}>{sensor.statusDescription}</Text>
        <View style={styles.detailRow}>
          <Text style={styles.label}>ID:</Text>
          <Text style={styles.value}>{sensor.id}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Tipo:</Text>
          <Text style={styles.value}>{sensor.type}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Descrição:</Text>
          <Text style={styles.value}>{sensor.description}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Unidade:</Text>
          <Text style={styles.value}>{sensor.unit}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Valor Atual:</Text>
          <Text style={styles.value}>{sensor.value}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Histórico:</Text>
          <Text style={styles.value}>{sensor.history.join(', ')}</Text>
        </View>
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
    padding: 24,
    width: '85%',
    marginBottom: 32,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: 12,
    backgroundColor: 'transparent',
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderWidth: 0,
    elevation: 0,
  },
  backText: { color: '#234366', fontSize: 16, marginLeft: 4, fontWeight: 'bold' },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  sensorName: { fontSize: 22, fontWeight: 'bold', color: '#234366', flex: 1, flexWrap: 'wrap' },
  statusRow: { flexDirection: 'row', alignItems: 'center', marginLeft: 8 },
  statusText: { fontWeight: 'bold', fontSize: 16 },
  statusDesc: { color: '#888', fontSize: 14, marginBottom: 12 },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'flex-start',
  },
  label: { fontWeight: 'bold', color: '#234366', width: 110 },
  value: { color: '#222', fontSize: 16, flex: 1, flexWrap: 'wrap' },
});