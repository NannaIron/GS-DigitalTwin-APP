import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Platform } from 'react-native';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError(false);
    try {
      const users = require('@/mock/users.json');
      const found = users.find(
        (u: { email: string; password: string }) =>
          u.email === email.trim() && u.password === password
      );
      if (found) {
        await AsyncStorage.setItem('usuarioLogado', email);
        router.replace('/(tabs)/menu');
      } else {
        setError(true);
      }
    } catch (e) {
      setError(true);
    }
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#fff' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={-60}
    >
      <View style={styles.container}>
        <Stack.Screen options={{ headerShown: false }} />
        <View style={styles.topContent}>
          <Image
            source={require('@/assets/images/splash-icon.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>Digital Twin - Sensor Viewer</Text>
          <Text style={styles.subtitle}>Entre com seu login e senha</Text>
          <View style={styles.rowInputs}>
            <TextInput
              style={[
                styles.input,
                styles.inputHalf,
                { marginRight: 8 },
                error && { borderColor: '#d9534f' }
              ]}
              placeholder="Usuário"
              autoCapitalize="none"
              keyboardType="default"
              value={email}
              onChangeText={setEmail}
              placeholderTextColor="#b0b0b0"
            />
            <TextInput
              style={[
                styles.input,
                styles.inputHalf,
                error && { borderColor: '#d9534f' }
              ]}
              placeholder="Senha"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              placeholderTextColor="#b0b0b0"
            />
          </View>
          {error && (
            <Text style={styles.errorText}>Usuário ou senha incorretos.</Text>
          )}
        </View>
        <TouchableOpacity
          style={[styles.button, loading && { opacity: 0.7 }]}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.buttonText}>{loading ? 'Entrando...' : 'Entrar'}</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', padding: 32 },
  topContent: { width: '100%', alignItems: 'center', marginTop: 80 },
  logo: { width: 120, height: 120, marginBottom: 24 },
  title: { textAlign: 'center', fontSize: 28, fontWeight: 'bold', marginBottom: 8, color: '#222' },
  subtitle: { textAlign: 'center', color: '#888', marginBottom: 24, fontSize: 16 },
  rowInputs: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    width: 300,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    backgroundColor: '#fafbfc',
  },
  inputHalf: {
    width: 146,
  },
  button: {
    backgroundColor: '#234366',
    borderRadius: 16,
    paddingVertical: 22,
    alignItems: 'center',
    width: 300,
    marginBottom: 100,
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 22 },
  errorText: { color: '#d9534f', marginBottom: 8, fontSize: 15, textAlign: 'center' }
});