import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { byId } from './data'

export type Order = { id: string; at: number; items: [string, number][]; total: number }
export type Booking = { id: string; day: string; time: string; guests: number; name: string }

type State = {
  cart: Record<string, number>
  orders: Order[]
  bookings: Booking[]
  setQty: (id: string, qty: number) => void
  add: (id: string) => void
  placeOrder: () => void
  book: (b: Omit<Booking, 'id'>) => void
}

export const cartTotal = (cart: State['cart']) =>
  Object.entries(cart).reduce((sum, [id, q]) => sum + (byId(id)?.price ?? 0) * q, 0)
export const cartCount = (cart: State['cart']) => Object.values(cart).reduce((a, b) => a + b, 0)

export const useStore = create<State>()(
  persist(
    (set, get) => ({
      cart: {},
      orders: [],
      bookings: [],
      setQty: (id, qty) =>
        set(({ cart }) => {
          const { [id]: _removed, ...rest } = cart
          return { cart: qty > 0 ? { ...rest, [id]: qty } : rest }
        }),
      add: (id) => get().setQty(id, (get().cart[id] ?? 0) + 1),
      placeOrder: () =>
        set(({ cart, orders }) => ({
          orders: [{ id: String(1001 + orders.length), at: Date.now(), items: Object.entries(cart), total: cartTotal(cart) }, ...orders],
          cart: {},
        })),
      book: (b) => set(({ bookings }) => ({ bookings: [{ ...b, id: `R${bookings.length + 1}` }, ...bookings] })),
    }),
    { name: 'savor', storage: createJSONStorage(() => AsyncStorage) },
  ),
)

const STEPS = ['Preparing', 'On the way', 'Delivered'] as const
const STEP_SECONDS = 8

/** Order progress derived from elapsed time (demo simulation). */
export function useOrderStep(at: number) {
  const [now, setNow] = useState(Date.now())
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [])
  const i = Math.min(STEPS.length - 1, Math.floor((now - at) / (STEP_SECONDS * 1000)))
  return { i, label: STEPS[i], steps: STEPS }
}
