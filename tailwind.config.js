/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: { extend: { colors: { brand: '#e8590c', ink: '#1f2328', soft: '#f7f4ef' } } },
}
