import '../../global.css'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

export default function Root() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerTintColor: '#1f2328', headerShadowVisible: false, contentStyle: { backgroundColor: '#f7f4ef' } }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="dish/[id]" options={{ title: '', headerStyle: { backgroundColor: '#f7f4ef' } }} />
      </Stack>
    </>
  )
}
