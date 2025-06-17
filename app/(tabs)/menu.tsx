import { StyleSheet, Text, View } from 'react-native';

export default function MenuScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Página inicial (Menu)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
  text: { fontSize: 20, color: '#234366' }
});