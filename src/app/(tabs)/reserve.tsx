import { useState } from 'react'
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native'
import { Minus, Plus } from 'lucide-react-native'
import { tap } from '@/lib/haptics'
import { useStore } from '@/lib/store'

const days = Array.from({ length: 6 }, (_, i) => {
  const d = new Date(Date.now() + i * 864e5)
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
})
const times = ['12:00', '13:00', '14:00', '18:00', '19:00', '20:00', '21:00']

const Chip = ({ label, on, press }: { label: string; on: boolean; press: () => void }) => (
  <Pressable accessibilityRole="button" onPress={press} className={`rounded-full border px-4 py-2 ${on ? 'border-brand bg-brand' : 'border-black/10 bg-white'}`}>
    <Text className={`text-sm ${on ? 'font-semibold text-white' : 'text-ink'}`}>{label}</Text>
  </Pressable>
)

export default function Reserve() {
  const book = useStore((s) => s.book)
  const bookings = useStore((s) => s.bookings)
  const [day, setDay] = useState(days[0])
  const [time, setTime] = useState(times[4])
  const [guests, setGuests] = useState(2)
  const [name, setName] = useState('')
  const [done, setDone] = useState(false)

  return (
    <ScrollView contentContainerClassName="gap-5 p-4">
      <View className="gap-2">
        <Text className="font-semibold text-ink">Date</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-2">
          {days.map((d) => <Chip key={d} label={d} on={d === day} press={() => setDay(d)} />)}
        </ScrollView>
      </View>
      <View className="gap-2">
        <Text className="font-semibold text-ink">Time</Text>
        <View className="flex-row flex-wrap gap-2">{times.map((t) => <Chip key={t} label={t} on={t === time} press={() => setTime(t)} />)}</View>
      </View>
      <View className="flex-row items-center justify-between rounded-2xl bg-white p-3">
        <Text className="font-semibold text-ink">Guests</Text>
        <View className="flex-row items-center gap-4">
          <Pressable accessibilityLabel="Fewer guests" onPress={() => setGuests((g) => Math.max(1, g - 1))} className="size-9 items-center justify-center rounded-full bg-soft"><Minus color="#1f2328" size={16} /></Pressable>
          <Text className="w-5 text-center text-base font-semibold text-ink">{guests}</Text>
          <Pressable accessibilityLabel="More guests" onPress={() => setGuests((g) => Math.min(12, g + 1))} className="size-9 items-center justify-center rounded-full bg-soft"><Plus color="#1f2328" size={16} /></Pressable>
        </View>
      </View>
      <TextInput value={name} onChangeText={(t) => { setName(t); setDone(false) }} placeholder="Your name" placeholderTextColor="#9aa0a6" className="rounded-2xl bg-white px-4 py-3 text-base text-ink" />
      <Pressable
        accessibilityRole="button"
        disabled={!name.trim()}
        onPress={() => { tap(); book({ day, time, guests, name: name.trim() }); setName(''); setDone(true) }}
        className={`items-center rounded-full py-4 ${name.trim() ? 'bg-brand active:opacity-80' : 'bg-brand/40'}`}
      >
        <Text className="font-semibold text-white">Reserve table</Text>
      </Pressable>
      {done && <Text className="text-center font-medium text-green-600">Table reserved ✓</Text>}
      {bookings.length > 0 && (
        <View className="gap-2">
          <Text className="font-semibold text-ink">Your reservations</Text>
          {bookings.map((b) => (
            <View key={b.id} className="rounded-2xl bg-white p-3">
              <Text className="font-medium text-ink">{b.day} · {b.time}</Text>
              <Text className="text-sm text-ink/60">{b.name}, {b.guests} guest{b.guests > 1 ? 's' : ''}</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  )
}
