import { router, useLocalSearchParams } from 'expo-router'
import { Pressable, Text, View } from 'react-native'
import { byId, money } from '@/lib/data'
import { useApp } from '@/lib/store'

export default function Dish() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const { add, cart } = useApp()
  const d = byId(id)
  if (!d) return <Text className="p-6 text-ink">Dish not found.</Text>

  return (
    <View className="flex-1 justify-between p-5">
      <View>
        <View className="h-56 items-center justify-center rounded-3xl bg-white">
          <Text className="text-8xl">{d.icon}</Text>
        </View>
        <View className="mt-5 flex-row items-start justify-between">
          <Text className="flex-1 text-2xl font-bold text-ink">{d.name}</Text>
          <Text className="text-2xl font-bold text-brand">{money(d.price)}</Text>
        </View>
        <View className="mt-2 flex-row gap-2">
          <Text className="rounded-full bg-white px-3 py-1 text-xs text-ink/70">⏱ {d.time} min</Text>
          {d.tag && <Text className="rounded-full bg-white px-3 py-1 text-xs text-ink/70">{d.tag}</Text>}
        </View>
        <Text className="mt-4 text-base leading-6 text-ink/70">{d.desc}</Text>
      </View>
      <Pressable accessibilityRole="button" onPress={() => { add(d.id); router.back() }} className="items-center rounded-full bg-brand py-4 active:opacity-80">
        <Text className="text-base font-semibold text-white">Add to cart{cart[d.id] ? ` (${cart[d.id]} in cart)` : ''}</Text>
      </Pressable>
    </View>
  )
}
