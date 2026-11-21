import * as Haptics from 'expo-haptics'

/** Light tactile feedback; silently ignored where unsupported (web, simulators). */
export const tap = () => void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {})
