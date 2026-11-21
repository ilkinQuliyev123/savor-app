import { Link } from 'expo-router'
import { Plus } from 'lucide-react-native'
import { useState } from 'react'
import { FlatList, Pressable, ScrollView, Text, View } from 'react-native'
import { categories, dishes, money } from '@/lib/data'
import { tap } from '@/lib/haptics'
import { useStore } from '@/lib/store'

export default function Menu() {
  const [cat, setCat] = useState<string>(categories[0])
  const add = useStore((s) => s.add)

  return (
    <View className="flex-1">
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="grow-0" contentContainerClassName="gap-2 px-4 py-3">
        {categories.map((c) => (
          <Pressable key={c} accessibilityRole="button" onPress={() => setCat(c)} className={`rounded-full border px-4 py-2 ${cat === c ? 'border-brand bg-brand' : 'border-black/10 bg-white'}`}>
            <Text className={`text-sm font-medium ${cat === c ? 'text-white' : 'text-ink'}`}>{c}</Text>
          </Pressable>
        ))}
      </ScrollView>
      <FlatList
        data={dishes.filter((d) => d.cat === cat)}
        keyExtractor={(d) => d.id}
        contentContainerClassName="gap-3 px-4 pb-6"
        renderItem={({ item: d }) => (
          <View className="flex-row items-center gap-3 rounded-2xl bg-white p-3">
            <Link href={{ pathname: '/dish/[id]', params: { id: d.id } }} asChild>
              <Pressable className="flex-1 flex-row items-center gap-4">
                <View className="size-20 items-center justify-center rounded-xl bg-soft">
                  <Text className="text-4xl">{d.icon}</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-base font-semibold text-ink">{d.name}</Text>
                  <Text numberOfLines={2} className="mt-0.5 text-xs text-ink/60">{d.desc}</Text>
                  <Text className="mt-1.5 font-bold text-ink">{money(d.price)}</Text>
                </View>
              </Pressable>
            </Link>
            <Pressable
              accessibilityLabel={`Add ${d.name}`}
              onPress={() => { tap(); add(d.id) }}
              className="size-9 items-center justify-center rounded-full bg-brand active:opacity-80"
            >
              <Plus color="#fff" size={20} />
            </Pressable>
          </View>
        )}
      />
    </View>
  )
}
