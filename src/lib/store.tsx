import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { byId } from './data'

export type Order = { id: string; at: number; items: [string, number][]; total: number }
export type Booking = { id: string; day: string; time: string; guests: number; name: string }

const S = createContext<ReturnType<typeof useStore>>(null!)
export const useApp = () => useContext(S)

function useStore() {
  const [cart, setCart] = useState<Record<string, number>>({})
  const [orders, setOrders] = useState<Order[]>([])
  const [bookings, setBookings] = useState<Booking[]>([])

  const setQty = (id: string, q: number) =>
    setCart((c) => {
      const next = { ...c, [id]: q }
      if (q <= 0) delete next[id]
      return next
    })
  const count = Object.values(cart).reduce((a, b) => a + b, 0)
  const total = Object.entries(cart).reduce((s, [id, q]) => s + (byId(id)?.price ?? 0) * q, 0)

  const placeOrder = () => {
    const o: Order = { id: String(1000 + orders.length + 1), at: Date.now(), items: Object.entries(cart), total }
    setOrders((l) => [o, ...l])
    setCart({})
    return o
  }
  const book = (b: Omit<Booking, 'id'>) => setBookings((l) => [{ ...b, id: `R${l.length + 1}` }, ...l])

  return { cart, count, total, setQty, add: (id: string) => setQty(id, (cart[id] ?? 0) + 1), orders, placeOrder, bookings, book }
}

export function AppProvider({ children }: { children: ReactNode }) {
  return <S.Provider value={useStore()}>{children}</S.Provider>
}

const STEPS = ['Preparing', 'On the way', 'Delivered'] as const
export const STEP_SECONDS = 8

/** Order progress derived from elapsed time (demo simulation). */
export function useStep(at: number) {
  const [now, setNow] = useState(Date.now())
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [])
  const i = Math.min(STEPS.length - 1, Math.floor((now - at) / 1000 / STEP_SECONDS))
  return { i, label: STEPS[i], steps: STEPS }
}
