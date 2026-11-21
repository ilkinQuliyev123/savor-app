export type Dish = { id: string; name: string; cat: string; price: number; icon: string; desc: string; time: number; tag?: string }

export const categories = ['Starters', 'Mains', 'Pizza', 'Desserts', 'Drinks'] as const

const d = (id: string, name: string, cat: string, price: number, icon: string, time: number, desc: string, tag?: string): Dish => ({ id, name, cat, price, icon, time, desc, tag })

export const dishes: Dish[] = [
  d('bruschetta', 'Tomato Bruschetta', 'Starters', 7.5, '🍅', 10, 'Grilled sourdough, ripe tomatoes, basil and olive oil.', 'Veg'),
  d('soup', 'Lentil Soup', 'Starters', 6, '🥣', 8, 'Slow-cooked red lentils with lemon and cumin.', 'Veg'),
  d('wings', 'Honey Chili Wings', 'Starters', 9.5, '🍗', 15, 'Crispy wings tossed in honey-chili glaze.', 'Spicy'),
  d('steak', 'Ribeye Steak', 'Mains', 24, '🥩', 25, '300 g ribeye, roasted potatoes and pepper sauce.', 'Chef'),
  d('salmon', 'Grilled Salmon', 'Mains', 19.5, '🐟', 20, 'Atlantic salmon, lemon butter, seasonal greens.'),
  d('pasta', 'Creamy Mushroom Pasta', 'Mains', 13, '🍝', 15, 'Tagliatelle, wild mushrooms, parmesan cream.', 'Veg'),
  d('burger', 'Smash Burger', 'Mains', 12.5, '🍔', 15, 'Double beef patty, cheddar, pickles, house sauce.'),
  d('margherita', 'Margherita', 'Pizza', 11, '🍕', 15, 'Tomato, fior di latte mozzarella, fresh basil.', 'Veg'),
  d('pepperoni', 'Pepperoni', 'Pizza', 13, '🍕', 15, 'Spicy pepperoni, mozzarella and oregano.', 'Spicy'),
  d('tiramisu', 'Tiramisu', 'Desserts', 7, '🍰', 5, 'Mascarpone, espresso-soaked ladyfingers, cocoa.'),
  d('cheesecake', 'Berry Cheesecake', 'Desserts', 7.5, '🍓', 5, 'New York style with a wild berry compote.'),
  d('lemonade', 'Mint Lemonade', 'Drinks', 4.5, '🍋', 3, 'Fresh lemons, mint and a little sparkle.'),
  d('latte', 'Vanilla Latte', 'Drinks', 4, '☕', 4, 'Double espresso, steamed milk, vanilla.'),
]

export const money = (n: number) => `$${n.toFixed(2)}`
export const byId = (id: string) => dishes.find((x) => x.id === id)
