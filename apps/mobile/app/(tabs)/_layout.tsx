import { Tabs } from 'expo-router';
import { Text } from 'react-native';

const COLORS = {
  background: '#09090F',
  active: '#A78BFA',
  inactive: '#777789',
  border: '#20202B',
};

const icons: Record<string, string> = {
  index: '⌂',
  discover: '⌕',
  library: '▤',
  calendar: '▦',
  profile: '◉',
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: COLORS.active,
        tabBarInactiveTintColor: COLORS.inactive,
        tabBarStyle: {
          backgroundColor: COLORS.background,
          borderTopColor: COLORS.border,
          height: 68,
          paddingTop: 8,
          paddingBottom: 8,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
        },
        tabBarIcon: ({ color }) => (
          <Text style={{ color, fontSize: 23 }}>
            {icons[route.name] ?? '•'}
          </Text>
        ),
      })}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="discover" options={{ title: 'Discover' }} />
      <Tabs.Screen name="library" options={{ title: 'My Library' }} />
      <Tabs.Screen name="calendar" options={{ title: 'Calendar' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />

      {/* Hide the Expo starter route */}
      <Tabs.Screen name="two" options={{ href: null }} />
    </Tabs>
  );
}