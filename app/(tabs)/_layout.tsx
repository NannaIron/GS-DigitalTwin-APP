import { IconSymbol } from '@/components/ui/IconSymbol';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="sensors"
        options={{
          title: 'Sensores',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="list" color={color} />,
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: 'Menu',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Configurações',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="settings" color={color} />,
        }}
      />
    </Tabs>
  );
}