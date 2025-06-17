import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
    const sensors = require('@/mock/sensors.json');
    const found = sensors.find((s: Sensor) => s.id === id);
    setSensor(found);
  }, [id]);

  if (!sensor) return null;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <MaterialIcons name="arrow-back" size={28} color="#234366" />
        <Text style={styles.backText}>Voltar</Text>
      </TouchableOpacity>
      <Text style={styles.title}>{sensor.name}</Text>
      <View style={styles.statusRow}>
        <MaterialIcons
          name={statusIcons[sensor.status] || 'help'}
          size={24}
          color={statusColors[sensor.status] || '#888'}
        />
        <Text style={[styles.statusText, { color: statusColors[sensor.status] || '#888' }]}>
          {sensor.status}
        </Text>
        <Text style={styles.statusDesc}>{sensor.statusDescription}</Text>
      </View>
      <View style={styles.infoBox}>
        <Text style={styles.label}>ID:</Text>
        <Text style={styles.value}>{sensor.id}</Text>
        <Text style={styles.label}>Tipo:</Text>
        <Text style={styles.value}>{sensor.type}</Text>
        <Text style={styles.label}>Descrição:</Text>
        <Text style={styles.value}>{sensor.description}</Text>
        <Text style={styles.label}>Unidade:</Text>
        <Text style={styles.value}>{sensor.unit}</Text>
        <Text style={styles.label}>Valor Atual:</Text>
        <Text style={styles.value}>{sensor.value}</Text>
        <Text style={styles.label}>Histórico:</Text>
        <Text style={styles.value}>{sensor.history.join(', ')}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#fff', padding: 24, alignItems: 'center', flexGrow: 1 },
  backBtn: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', marginBottom: 12 },
  backText: { color: '#234366', fontSize: 16, marginLeft: 4 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#234366', marginBottom: 12, textAlign: 'center' },
  statusRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  statusText: { fontWeight: 'bold', fontSize: 16, marginLeft: 6, marginRight: 8 },
  statusDesc: { color: '#888', fontSize: 14, marginLeft: 8 },
  infoBox: {
    backgroundColor: '#f7f8fa',
    borderRadius: 14,
    padding: 18,
    width: '100%',
    marginTop: 8
  },
  label: { fontWeight: 'bold', color: '#234366', marginTop: 8 },
  value: { color: '#222', marginBottom: 2, fontSize: 16 }
});