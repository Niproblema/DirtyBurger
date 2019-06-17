import React from 'react';

const FOOD_LIST = { //TODO: import this with xml or db.
    categories: ["Drinks, Main Dishes, Side Dishes, Salads, Desserts"],
    /**
     * Food fields:
     * name, description, category, image, price, custom.
     */
    listings: [
        {
            name: "Pancakes",
            description: "Flattened bread like food.",
            category: 1,
            image: 'assets/food/pancakes.jpg',
            price: "3.50€"
        }, {
            name: "Hamburger",  //Todo: add constumization
            description: "Two bread buns with meat and other stuff.",
            category: 1,
            image: 'assets/food/burger.jpg',
            price: "4.00€",
            custom: ["Extra bun, Meat, Cheese, Lettuce, Pickle, Tomato"]
        }, {
            name: "French Fries",
            description: "Fried potatoes from France.",
            category: 1,
            image: 'assets/food/fries.jpg',
            price: "1.00€"
        }, {
            name: "Ice Cream",
            description: "Flavoured snow.",
            category: 4,
            image: 'assets/food/icecream.jpg',
            price: "1.50€",
            custom: ["Vanilla", "Chocolate", "Strawberry", "Lemon"]
        }, {
            name: "Salad",
            description: "Mixture of small pieces of food, usually vegetables.",
            category: 3,
            image: 'assets/food/salad.jpg',
            price: "4.00€"
        }, {
            name: "Steak",
            description: "Cooked meat.",
            category: 1,
            image: 'assets/food/steak.jpg',
            price: "11.00€",
            custom : []
        }, {
            name: "Water",
            description: "H2O",
            category: 0,
            image: null,
            price: "0.00€"
        }, {
            name: "Wine",
            description: "Alcoholic grape juice.",
            category: 0,
            image: null,
            price: "6.00€"
        }
    ]
}

const Food = (props) => {
    return null;
}

export default Food;