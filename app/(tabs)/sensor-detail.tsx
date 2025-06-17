import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SensorChart from '@/components/SensorChart';
import { FloatingReloadButton } from '@/components/ui/FloatingReloadButton';
import { IconSymbol } from '@/components/ui/IconSymbol';

type Sensor = {
  id: string;
  name: string;
  type: string;
  description: string;
  unit: string;
  value: number | null;
  status: string;
  statusDescription: string;
  history: number[];
  minValue: number;
  maxValue: number;
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
  const [loading, setLoading] = useState(false);

  const spinAnim = useRef(new Animated.Value(0)).current;

  const startSpin = () => {
    spinAnim.setValue(0);
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 900,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  };

  const stopSpin = () => {
    spinAnim.stopAnimation();
    spinAnim.setValue(0);
  };

  const reload = () => {
    setLoading(true);
    setSensor(null);
    startSpin();
    setTimeout(() => {
      const data: Sensor[] = require('@/mock/sensors.json');
      const found = data.find((s: Sensor) => s.id === id);
      setSensor(found || null);
      setLoading(false);
      stopSpin();
    }, 900);
  };

  useEffect(() => {
    reload();
  }, [id]);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  if (loading || !sensor) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <MaterialIcons name="arrow-back" size={34} color="#888" />
          </TouchableOpacity>
          <Text style={styles.title}>Detalhes do Sensor</Text>
        </View>
        <View style={styles.infoBox}>
          <View style={{ alignItems: 'center', justifyContent: 'center', minHeight: 300 }}>
            <Animated.View style={{ transform: [{ rotate: spin }] }}>
              <IconSymbol name="reload" size={80} color="#234366" />
            </Animated.View>
          </View>
        </View>
        <FloatingReloadButton onPress={reload} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={34} color="#888" />
        </TouchableOpacity>
        <Text style={styles.title}>Detalhes do Sensor</Text>
      </View>
      <View style={styles.infoBox}>
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
        <Text style={styles.description}>{sensor.description}</Text>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Tipo:</Text>
          <Text style={styles.value}>{sensor.type}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Valor:</Text>
          <Text style={styles.value}>
            {sensor.value === null || sensor.value === undefined
              ? '--'
              : `${sensor.value} ${sensor.unit}`}
          </Text>
        </View>
        <Text style={styles.chartTitle}>Histórico - Última hora</Text>
        <SensorChart data={sensor.history} minValue={sensor.minValue} maxValue={sensor.maxValue} />
        <Text style={styles.chartNote}>*Medições a cada 30 min</Text>
      </View>
      <FloatingReloadButton onPress={reload} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#234366', alignItems: 'center', paddingTop: 60 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '85%',
    marginBottom: 32,
  },
  backBtn: {
    marginRight: 12,
    backgroundColor: 'transparent',
    padding: 0,
    borderWidth: 0,
    elevation: 0,
  },
  title: { color: '#fff', fontSize: 28, fontWeight: 'bold' },
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
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 0,
  },
  sensorName: { fontSize: 22, fontWeight: 'bold', color: '#234366', flex: 1, flexWrap: 'wrap' },
  statusRow: { flexDirection: 'row', alignItems: 'center', marginLeft: 8 },
  statusText: { fontWeight: 'bold', fontSize: 16 },
  statusDesc: { color: '#888', fontSize: 14, marginBottom: 8, marginTop: 4 },
  description: {
    color: '#222',
    fontSize: 16,
    marginBottom: 8,
    marginTop: 4,
    flexWrap: 'wrap',
    width: '100%',
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'flex-start',
  },
  label: { fontWeight: 'bold', color: '#234366', width: 70 },
  value: { color: '#222', fontSize: 16, flex: 1, flexWrap: 'wrap' },
  chartTitle: {
    fontWeight: 'bold',
    color: '#234366',
    fontSize: 16,
    marginTop: 18,
    marginBottom: 0,
  },
  chartNote: {
    color: '#888',
    fontSize: 12,
    marginTop: -15,
    textAlign: 'left',
  },
});