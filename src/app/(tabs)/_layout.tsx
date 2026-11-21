import { Tabs } from 'expo-router'
import { Text } from 'react-native'
import { useApp } from '@/lib/store'

const icon = (e: string) => () => <Text style={{ fontSize: 20 }}>{e}</Text>

export default function TabsLayout() {
  const { count, orders } = useApp()
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#e8590c',
        tabBarInactiveTintColor: '#8a8f98',
        headerTitleStyle: { fontWeight: '700' },
        headerStyle: { backgroundColor: '#f7f4ef' },
        headerShadowVisible: false,
        sceneStyle: { backgroundColor: '#f7f4ef' },
        tabBarStyle: { backgroundColor: '#fff', borderTopColor: '#eee', height: 62, paddingBottom: 6 },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Menu', tabBarIcon: icon('🍽️') }} />
      <Tabs.Screen name="cart" options={{ title: 'Cart', tabBarIcon: icon('🛒'), tabBarBadge: count || undefined }} />
      <Tabs.Screen name="orders" options={{ title: 'Orders', tabBarIcon: icon('🧾'), tabBarBadge: orders.length || undefined }} />
      <Tabs.Screen name="reserve" options={{ title: 'Reserve', tabBarIcon: icon('📅') }} />
    </Tabs>
  )
}
