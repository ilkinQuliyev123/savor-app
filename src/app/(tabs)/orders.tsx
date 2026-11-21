import { Receipt } from 'lucide-react-native'
import { FlatList, Text, View } from 'react-native'
import { byId, money } from '@/lib/data'
import { useOrderStep, useStore, type Order } from '@/lib/store'

function OrderCard({ o }: { o: Order }) {
  const { i, label, steps } = useOrderStep(o.at)
  return (
    <View className="gap-3 rounded-2xl bg-white p-4">
      <View className="flex-row justify-between">
        <Text className="font-bold text-ink">Order #{o.id}</Text>
        <Text className={`text-sm font-semibold ${i === steps.length - 1 ? 'text-green-600' : 'text-brand'}`}>{label}</Text>
      </View>
      <View className="flex-row gap-1">
        {steps.map((s, n) => <View key={s} className={`h-1.5 flex-1 rounded-full ${n <= i ? 'bg-brand' : 'bg-black/10'}`} />)}
      </View>
      <Text className="text-sm text-ink/60">{o.items.map(([id, q]) => `${q}× ${byId(id)?.name}`).join(', ')}</Text>
      <Text className="font-semibold text-ink">{money(o.total)}</Text>
    </View>
  )
}

export default function Orders() {
  const orders = useStore((s) => s.orders)
  if (!orders.length)
    return (
      <View className="flex-1 items-center justify-center gap-3 p-8">
        <Receipt color="#9aa0a6" size={44} strokeWidth={1.5} />
        <Text className="text-base text-ink/60">No orders yet</Text>
      </View>
    )
  return <FlatList data={orders} keyExtractor={(o) => o.id} contentContainerClassName="gap-3 p-4" renderItem={({ item }) => <OrderCard o={item} />} />
}
