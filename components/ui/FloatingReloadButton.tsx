import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { IconSymbol } from './IconSymbol';

export function FloatingReloadButton({ onPress }: { onPress: () => void }) {
  return (
    <View style={styles.container} pointerEvents="box-none">
      <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.8}>
        <IconSymbol name="reload" size={32} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 24,
    bottom: 32,
    zIndex: 100,
    elevation: 100,
  },
  button: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#3578c9',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },
});