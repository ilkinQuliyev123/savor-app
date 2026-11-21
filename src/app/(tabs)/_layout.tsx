import { Tabs } from 'expo-router'
import type { ColorValue } from 'react-native'
import { CalendarDays, Receipt, ShoppingBag, UtensilsCrossed, type LucideIcon } from 'lucide-react-native'
import { cartCount, useStore } from '@/lib/store'

const icon = (Icon: LucideIcon) => ({ color, size }: { color: ColorValue; size: number }) => <Icon color={color as string} size={size} />

export default function TabsLayout() {
  const count = useStore((s) => cartCount(s.cart))
  const orders = useStore((s) => s.orders.length)
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
      <Tabs.Screen name="index" options={{ title: 'Menu', tabBarIcon: icon(UtensilsCrossed) }} />
      <Tabs.Screen name="cart" options={{ title: 'Cart', tabBarIcon: icon(ShoppingBag), tabBarBadge: count || undefined }} />
      <Tabs.Screen name="orders" options={{ title: 'Orders', tabBarIcon: icon(Receipt), tabBarBadge: orders || undefined }} />
      <Tabs.Screen name="reserve" options={{ title: 'Reserve', tabBarIcon: icon(CalendarDays) }} />
    </Tabs>
  )
}
