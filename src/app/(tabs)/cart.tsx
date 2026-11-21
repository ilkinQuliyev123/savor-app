import { router } from 'expo-router'
import { Minus, Plus, ShoppingBag } from 'lucide-react-native'
import { FlatList, Pressable, Text, View } from 'react-native'
import { byId, money } from '@/lib/data'
import { tap } from '@/lib/haptics'
import { cartTotal, useStore } from '@/lib/store'

const Step = ({ label, onPress, children }: { label: string; onPress: () => void; children: React.ReactNode }) => (
  <Pressable accessibilityLabel={label} onPress={() => { tap(); onPress() }} className="size-8 items-center justify-center rounded-full bg-soft active:opacity-70">
    {children}
  </Pressable>
)

export default function Cart() {
  const cart = useStore((s) => s.cart)
  const setQty = useStore((s) => s.setQty)
  const placeOrder = useStore((s) => s.placeOrder)
  const lines = Object.entries(cart).flatMap(([id, q]) => { const d = byId(id); return d ? [{ d, q }] : [] })

  if (!lines.length)
    return (
      <View className="flex-1 items-center justify-center gap-3 p-8">
        <ShoppingBag color="#9aa0a6" size={44} strokeWidth={1.5} />
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
              <Step label={`Remove one ${d.name}`} onPress={() => setQty(d.id, q - 1)}><Minus color="#1f2328" size={16} /></Step>
              <Text className="w-4 text-center font-semibold text-ink">{q}</Text>
              <Step label={`Add one ${d.name}`} onPress={() => setQty(d.id, q + 1)}><Plus color="#1f2328" size={16} /></Step>
            </View>
          </View>
        )}
      />
      <View className="gap-3 border-t border-black/5 bg-white p-4">
        <View className="flex-row justify-between">
          <Text className="text-ink/60">Total</Text>
          <Text className="text-xl font-bold text-ink">{money(cartTotal(cart))}</Text>
        </View>
        <Pressable accessibilityRole="button" onPress={() => { tap(); placeOrder(); router.navigate('/orders') }} className="items-center rounded-full bg-brand py-4 active:opacity-80">
          <Text className="font-semibold text-white">Place order</Text>
        </Pressable>
      </View>
    </View>
  )
}
