import { router, useLocalSearchParams } from 'expo-router'
import { Clock, Flame, Leaf } from 'lucide-react-native'
import { Pressable, Text, View } from 'react-native'
import { byId, money } from '@/lib/data'
import { tap } from '@/lib/haptics'
import { useStore } from '@/lib/store'

const TAGS = { Veg: Leaf, Spicy: Flame } as const

const Pill = ({ children }: { children: React.ReactNode }) => (
  <View className="flex-row items-center gap-1.5 rounded-full bg-white px-3 py-1">{children}</View>
)

export default function Dish() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const d = byId(id)
  const add = useStore((s) => s.add)
  const inCart = useStore((s) => s.cart[id] ?? 0)
  if (!d) return <Text className="p-6 text-ink">Dish not found.</Text>
  const TagIcon = d.tag && d.tag in TAGS ? TAGS[d.tag as keyof typeof TAGS] : null

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
        <View className="mt-3 flex-row gap-2">
          <Pill><Clock color="#6b7280" size={14} /><Text className="text-xs text-ink/70">{d.time} min</Text></Pill>
          {d.tag && <Pill>{TagIcon && <TagIcon color="#6b7280" size={14} />}<Text className="text-xs text-ink/70">{d.tag}</Text></Pill>}
        </View>
        <Text className="mt-4 text-base leading-6 text-ink/70">{d.desc}</Text>
      </View>
      <Pressable accessibilityRole="button" onPress={() => { tap(); add(d.id); router.back() }} className="items-center rounded-full bg-brand py-4 active:opacity-80">
        <Text className="text-base font-semibold text-white">Add to cart{inCart ? ` (${inCart} in cart)` : ''}</Text>
      </Pressable>
    </View>
  )
}
