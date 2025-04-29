export const foodItems = [
    { id: "peas", name: "Lowly Peas", type: "food", price: 5, health: 10 },
    { id: "carrot", name: "Crisp Carrot", type: "food", price: 10, health: 20 },
    { id: "tomato", name: "Juicy Tomato", type: "food", price: 15, health: 40 },
    { id: "chili_pepper", name: "Fiery Pepper", type: "food", price: 20, health: 50 },
    { id: "corn", name: "Sweet Corn", type: "food", price: 25, health: 60 },
    { id: "purple_cabbage", name: "Magic Cabbage", type: "food", price: 40, health: 100 },
];

export const vanityItems = [
    { id: 'hat_red', name: 'Red Hat', type: 'vanity', price: 50 },
    { id: 'glasses_sun', name: 'Sunglasses', type: 'vanity', price: 75 },
];

// oof
export const chooseItemSprite = (id: string) => {
    switch (id) {
        case "peas":
            return require("@/assets/images/items/peas.png");
        case "carrot":
            return require("@/assets/images/items/carrot.png");
        case "tomato":
            return require("@/assets/images/items/tomato.png");
        case "chili_pepper":
            return require("@/assets/images/items/chili_pepper.png");
        case "corn":
            return require("@/assets/images/items/corn.png");
        case "purple_cabbage":
            return require("@/assets/images/items/purple_cabbage.png");
    }
};
