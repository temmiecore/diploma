export const foodItems = [
    { id: "peas", name: "Lowly Peas", type: "food", price: 5, health: 10 },
    { id: "carrot", name: "Crisp Carrot", type: "food", price: 10, health: 20 },
    { id: "tomato", name: "Juicy Tomato", type: "food", price: 15, health: 40 },
    { id: "chili_pepper", name: "Fiery Pepper", type: "food", price: 20, health: 50 },
    { id: "corn", name: "Sweet Corn", type: "food", price: 25, health: 60 },
    { id: "purple_cabbage", name: "Magic Cabbage", type: "food", price: 40, health: 100 },
];

export const vanityItems = [
    { id: 'clover', name: 'Lucky Clover', type: 'vanity', price: 30 },
    { id: 'glasses', name: 'Sunglasses', type: 'vanity', price: 40 },
    { id: 'leather_armor', name: 'Leather Armor', type: 'vanity', price: 50 },
    { id: 'ring', name: 'Magic Ring', type: 'vanity', price: 60 },
    { id: 'hp_potion', name: 'Health Potion', type: 'vanity', price: 20 },
    { id: 'iron_armor', name: 'Iron Armor', type: 'vanity', price: 85 },
    { id: 'wrong_id', name: 'Placeholder', type: 'vanity', price: 999 },
];

const itemSprites: Record<string, any> = {
  peas: require("@/assets/images/items/peas.png"),
  carrot: require("@/assets/images/items/carrot.png"),
  tomato: require("@/assets/images/items/tomato.png"),
  chili_pepper: require("@/assets/images/items/chili_pepper.png"),
  corn: require("@/assets/images/items/corn.png"),
  purple_cabbage: require("@/assets/images/items/purple_cabbage.png"),
  clover: require("@/assets/images/items/clover.png"),
  glasses: require("@/assets/images/items/glasses.png"),
  leather_armor: require("@/assets/images/items/leather_armor.png"),
  ring: require("@/assets/images/items/ring.png"),
  hp_potion: require("@/assets/images/items/hp_potion.png"),
  iron_armor: require("@/assets/images/items/iron_armor.png"),
};

export const chooseItemSprite = (id: string) => 
  itemSprites[id] || require("@/assets/images/items/placeholder.png");
