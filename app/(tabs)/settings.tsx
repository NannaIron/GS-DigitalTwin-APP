import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { environment } from '@/environment';

export default function SettingsScreen() {
  const [url, setUrl] = useState('');
  const [user, setUser] = useState('');
  const router = useRouter();

  useEffect(() => {
    setUrl(environment.apiUrl || '');
    
    AsyncStorage.getItem('usuarioLogado').then(storedUser => {
      setUser(storedUser || '');
    });
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('usuarioLogado');
    router.replace('/login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurações</Text>
      <View style={styles.infoBox}>
        <Text style={styles.label}>Usuário</Text>
        <View style={styles.textBox}>
          <Text style={styles.text}>{user || 'Não logado'}</Text>
        </View>
        <Text style={[styles.label, { marginTop: 16 }]}>URL do back-end</Text>
        <View style={styles.textBox}>
          <Text style={styles.text}>{url || 'Não configurado'}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.logout} onPress={handleLogout}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
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
  },
  label: { fontSize: 16, color: '#234366', fontWeight: 'bold', marginBottom: 4 },
  textBox: {
    backgroundColor: '#f7f8fa',
    borderRadius: 8,
    padding: 12,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  text: { fontSize: 16, color: '#222' },
  logout: {
    backgroundColor: '#e3403b',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#a3231f',
    width: '85%',
    elevation: 2,
    marginTop: 170,
  },
  logoutText: { color: '#ffffff', fontWeight: 'bold', fontSize: 18 },
});