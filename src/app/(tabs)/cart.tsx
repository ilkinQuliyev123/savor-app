import { router } from 'expo-router'
import { FlatList, Pressable, Text, View } from 'react-native'
import { byId, money } from '@/lib/data'
import { useApp } from '@/lib/store'

export default function Cart() {
  const { cart, total, setQty, placeOrder } = useApp()
  const lines = Object.entries(cart).flatMap(([id, q]) => (byId(id) ? [{ d: byId(id)!, q }] : []))

  if (!lines.length)
    return (
      <View className="flex-1 items-center justify-center gap-2 p-8">
        <Text className="text-5xl">🛒</Text>
        <Text className="text-base text-ink/60">Your cart is empty</Text>
      </View>
    )

  return (
    <View className="flex-1">
      <FlatList
        data={lines}
        keyExtractor={(l) => l.d.id}
        contentContainerClassName="gap-3 p-4"
        renderItem={({ item: { d, q } }) => (
          <View className="flex-row items-center gap-3 rounded-2xl bg-white p-3">
            <Text className="text-3xl">{d.icon}</Text>
            <View className="flex-1">
              <Text className="font-semibold text-ink">{d.name}</Text>
              <Text className="text-sm text-ink/60">{money(d.price * q)}</Text>
            </View>
            <View className="flex-row items-center gap-3">
              <Pressable accessibilityLabel={`Remove one ${d.name}`} onPress={() => setQty(d.id, q - 1)} className="size-8 items-center justify-center rounded-full bg-soft"><Text className="text-lg text-ink">−</Text></Pressable>
              <Text className="w-4 text-center font-semibold text-ink">{q}</Text>
              <Pressable accessibilityLabel={`Add one ${d.name}`} onPress={() => setQty(d.id, q + 1)} className="size-8 items-center justify-center rounded-full bg-soft"><Text className="text-lg text-ink">+</Text></Pressable>
            </View>
          </View>
        )}
      />
      <View className="gap-3 border-t border-black/5 bg-white p-4">
        <View className="flex-row justify-between"><Text className="text-ink/60">Total</Text><Text className="text-xl font-bold text-ink">{money(total)}</Text></View>
        <Pressable accessibilityRole="button" onPress={() => { placeOrder(); router.navigate('/orders') }} className="items-center rounded-full bg-brand py-4 active:opacity-80">
          <Text className="font-semibold text-white">Place order</Text>
        </Pressable>
      </View>
    </View>
  )
}
