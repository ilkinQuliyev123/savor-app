# Savor — restaurant mobile app

Goal: restaurant app: browse menu by category, dish details, cart, place order, order tracking, reservations. Portfolio piece for Upwork.

Stack: React Native (Expo) + TypeScript + NativeWind (Tailwind). Demo data only.
Repo: github.com/ilkinQuliyev123/savor-app (public)

## Rules (from the owner — follow always)
1. **Log every change here.** After each piece of work, update "Progress" below. When resuming, read this file first and continue from "Next steps".
2. **Save tokens:** write smart, working, short code — like a senior engineer. No boilerplate, no dead code, no over-engineering.
3. **Test as you build.** Run the app and check every screen/flow works end to end before marking it done.
4. **UI:** modest, clean, not bloated, pleasant to the eye. Generous spacing, one accent color, few fonts.
5. **Stack:** TypeScript + Tailwind CSS everywhere (mobile: React Native + NativeWind).
6. **Portfolio language is English.** Public text in the repo (README) is English too.
7. **Do not copy brands/assets** of reference sites — layout inspiration only, own name and look.
8. **Model routing:** simple/mechanical tasks (scaffolding, renaming, data files, screenshots, README) go to lighter models (Agent `model: "haiku"` or `"sonnet"`); complex tasks (architecture, state logic, tricky bugs, review) go to the strongest model. Pick the lightest model that can do the job.

## Progress
- [x] Scaffold: Expo SDK 58 + expo-router (src/app) + NativeWind 4.2.7 (Tailwind 3) + TypeScript. Config: babel.config.js, metro.config.js, tailwind.config.js, global.css, tsconfig `@/*` -> src/*
- [x] Data (src/lib/data.ts: 13 dishes, 5 categories), state (src/lib/store.tsx: cart, orders, bookings; order status simulated by elapsed time)
- [x] Screens: Menu (category chips), Dish detail, Cart, Orders (live status Preparing -> On the way -> Delivered), Reserve (date/time/guests/name)
- [x] Fixed bug: "+" button nested inside a Link also navigated; keep action buttons outside Link
- [x] E2E (Playwright on `expo export --platform web`, mobile viewport): 12 checks pass; `npx tsc --noEmit` clean
- [ ] GitHub repo pushed
- [ ] Screenshots into portfolio card
## Gotchas
- This folder sits inside the Desktop git repo: always `git init` inside the project folder before committing, never `git add` from the parent.
- Test web build: `npx expo export --platform web` then `npx serve -s dist`.
## Next steps
1. Push to GitHub, add card + screenshots to portfolio
2. Nice-to-have: persist cart with AsyncStorage, real photos, dark mode
