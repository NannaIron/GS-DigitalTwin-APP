import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { FloatingReloadButton } from '@/components/ui/FloatingReloadButton';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { getReadings } from '@/service/sensors.service';

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
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
    setSensors([]);
    startSpin();
    (async () => {
      try {
        const data = await getReadings();
        setSensors(data);
      } catch (err) {
        console.error('Erro ao buscar sensores do backend, usando mock:', err);
        try {
          const data = require('@/mock/sensors.json');
          setSensors(data);
        } catch (e) {
          console.error('Falha ao carregar mock:', e);
        }
      } finally {
        setLoading(false);
        stopSpin();
      }
    })();
  };

  useEffect(() => {
    reload();
  }, []);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sensores</Text>
      <View style={styles.infoBox}>
        {loading ? (
          <View style={styles.loadingBox}>
            <Animated.View style={{ transform: [{ rotate: spin }] }}>
              <IconSymbol name="reload" size={80} color="#234366" />
            </Animated.View>
          </View>
        ) : (
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
        )}
      </View>
      <FloatingReloadButton onPress={reload} />
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
  statusText: { fontWeight: 'bold', fontSize: 15 },
  loadingBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 180,
  },
});