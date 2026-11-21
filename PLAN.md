# Savor — Project & Functionality Plan

## 1. Project plan
**Goal:** a polished restaurant mobile app for the Upwork portfolio: order food, track the order, reserve a table. Modest, warm, uncluttered UI.

**Stack (latest):** Expo SDK 58 · React Native 0.88 · expo-router · TypeScript · NativeWind 4 (Tailwind) · Lucide icons (react-native-svg) · Zustand + AsyncStorage (persisted state) · Reanimated for small transitions. Web build deployed on Netlify for demo.

| Phase | Scope | Status |
|---|---|---|
| 0 | Plan + libraries + icon system | in progress |
| 1 | Core flow: menu, dish, cart, orders, reserve | done (v1) |
| 2 | Polish: icons, persistence, haptics, animations, real food photos | todo |
| 3 | Dish options (size, extras), notes, search, favorites | todo |
| 4 | Order tracking UI, reservation edit/cancel, profile tab | todo |
| 5 | Tests, accessibility, native device check (Android emulator / Expo Go) | todo |

## 2. Functionality plan
**Menu:** category chips · search · dish cards with photo, price, tags (veg, spicy) · favorites.
**Dish:** photo header · description · options (size / extras) · quantity · notes · add to cart.
**Cart:** line items · stepper · edit options · delivery vs pick-up · tip · total · persisted.
**Orders:** list with live status (Preparing → On the way → Delivered) · order details · reorder.
**Reservations:** date/time/guests/name · availability slots · edit / cancel · confirmation.
**Profile (later):** saved address, favorites, past orders.
**Out of scope:** real payments, real backend, push notifications (demo data in memory + local storage).

## 3. Definition of done
`npx tsc --noEmit` clean · web E2E script passes · no console errors · each screen usable at 360–430 px width.
