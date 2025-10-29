// Product Type Definition
// export interface Product {
//   id: string | number;
//   _id?: string;
//   name: string;
//   category: string;
//   price: number;
//   oldPrice?: number;
//   rating: number;
//   reviewCount?: number;
//   image: string;
//   images: string[];
//   description: string;
//   stock?: number;
//   stockQuantity?: number;
//   stockUnit?: 'kg' | 'litre' | 'dozen' | 'piece' | 'grams' | 'ml';
//   stockStatus?: 'In Stock' | 'Out of Stock';
//   tags?: string[];
//   discount?: number | string;
//   isHotDeal?: boolean;
//   isBestSeller?: boolean;
//   isTopRated?: boolean;
//   status?: 'sale' | 'new' | 'hover' | null;
// }

/*
==========================================
PRODUCT Details
==========================================

name: Fresh Anjir
price: 280.00
description: Premium dried figs with natural sweetness and chewy texture. Packed with dietary fiber, minerals, and antioxidants. Perfect as a healthy snack or adding to desserts and salads.
category: Dry Fruits
Unit: kg
tags: Dry Fruits, Anjir, Fig, Healthy, Nutritious

name: Fresh Avocado
price: 150.00
description: Creamy avocados with rich, buttery texture and mild flavor. Great for salads, toasts, and smoothies. Loaded with healthy fats, fiber, and essential vitamins for balanced nutrition.
category: Fresh Fruit
Unit: kg
tags: Fresh Fruit, Avocado, Exotic, Healthy Fats, Organic

name: Fresh Banana
price: 40.00
description: Sweet yellow bananas naturally ripened for perfect taste. Rich in potassium and energy-boosting carbohydrates. Ideal for breakfast, smoothies, or as a quick healthy snack anytime.
category: Fresh Fruit
Unit: Dozen
tags: Fresh Fruit, Banana, Yellow, Energy, Potassium

name: Fresh Beetroot
price: 35.00
description: Vibrant red beets with earthy sweetness and firm texture. Excellent for salads, juices, or roasting. High in nitrates, fiber, and essential minerals supporting overall health.
category: Vegetables
Unit: kg
tags: Vegetables, Beetroot, Red, Healthy, Root Vegetable

name: Brussels Sprouts
price: 120.00
description: Tender Brussels sprouts with a slightly nutty flavor. Perfect for roasting, sautéing, or steaming. Rich in vitamins C and K, adding nutritious variety to your meals.
category: Vegetables
Unit: kg
tags: Vegetables, Brussels Sprouts, Green, Nutritious, Healthy

name: Fresh Cabbage
price: 25.00
description: Crisp green cabbage heads with tightly packed leaves. Versatile for salads, stir-fries, or traditional sabzi. Low in calories and high in vitamin C for everyday cooking.
category: Vegetables
Unit: kg
tags: Vegetables, Cabbage, Green, Fresh, Crunchy

name: Fresh Cauliflower
price: 30.00
description: White cauliflower with compact florets and mild taste. Perfect for curries, parathas, or rice alternatives. Packed with vitamins and antioxidants for wholesome family meals.
category: Vegetables
Unit: kg
tags: Vegetables, Cauliflower, White, Fresh, Versatile

name: Fresh Cherries
price: 450.00
description: Juicy red cherries with sweet-tart flavor and firm texture. Great for snacking, baking, or making preserves. Rich in antioxidants and vitamins for a healthy treat.
category: Fresh Fruit
Unit: kg
tags: Fresh Fruit, Cherry, Red, Sweet, Antioxidants

name: Fresh Corn
price: 20.00
description: Sweet corn cobs with tender golden kernels. Perfect for grilling, boiling, or adding to salads and curries. High in fiber and natural sugars for satisfying meals.
category: Vegetables
Unit: piece
tags: Vegetables, Corn, Sweet, Yellow, Fresh

name: Fresh Cucumber
price: 30.00
description: Cool and crisp cucumbers with refreshing taste. Perfect for salads, raita, or fresh juices. Low in calories and high in water content, ideal for hydration.
category: Vegetables
Unit: kg
tags: Vegetables, Cucumber, Green, Fresh, Hydrating

name: Fresh Eggplant
price: 35.00
description: Purple eggplants with glossy skin and creamy flesh. Excellent for bharta, curries, and grilling. Rich in fiber and antioxidants, bringing versatility to your kitchen.
category: Vegetables
Unit: kg
tags: Vegetables, Eggplant, Brinjal, Purple, Fresh

name: Farm Fresh Eggs
price: 60.00
description: Free-range eggs with rich golden yolks and superior taste. High-quality protein source for breakfast and baking. Fresh from local farms for nutritious, delicious meals.
category: Dairy & Eggs
Unit: dozen
tags: Dairy, Eggs, Protein, Fresh, Farm

name: Fresh Garlic
price: 80.00
description: Aromatic garlic bulbs with pungent flavor and firm cloves. Essential for Indian cooking, tadka, and marinades. Known for health benefits and adding depth to every dish.
category: Vegetables
Unit: kg
tags: Vegetables, Garlic, Aromatic, Spice, Fresh

name: Green Apple
price: 120.00
description: Crisp green apples with tangy-sweet flavor. Perfect for snacking, salads, or baking. High in fiber and vitamin C for healthy eating habits.
category: Fresh Fruit
Unit: kg
tags: Fresh Fruit, Apple, Green, Tangy, Crisp

name: Green Chilli
price: 25.00
description: Fresh green chilies adding spice and flavor to dishes. Essential for Indian curries, chutneys, and tempering. Rich in vitamins while boosting metabolism naturally.
category: Vegetables
Unit: kg
tags: Vegetables, Chilli, Green, Spicy, Hot

name: Green Lettuce
price: 50.00
description: Fresh crisp lettuce with tender green leaves. Perfect for salads, wraps, and sandwiches. Low in calories and packed with vitamins for light, healthy meals.
category: Vegetables
Unit: piece
tags: Vegetables, Lettuce, Green, Salad, Fresh

name: Green Capsicum
price: 60.00
description: Fresh green bell peppers with crisp texture and mild taste. Great for stir-fries, stuffing, and salads. Loaded with vitamin C and antioxidants for nutritious cooking.
category: Vegetables
Unit: kg
tags: Vegetables, Capsicum, Bell Pepper, Green, Fresh

name: Premium Cashews
price: 650.00
description: Whole cashew nuts with creamy texture and buttery flavor. Perfect for snacking, sweets, and garnishing. Rich in healthy fats, protein, and minerals for balanced nutrition.
category: Dry Fruits
Unit: kg
tags: Dry Fruits, Cashew, Kaju, Nuts, Premium

name: Fresh Kale
price: 80.00
description: Nutrient-dense kale with dark green curly leaves. Excellent for salads, smoothies, and sautéing. Packed with vitamins, minerals, and antioxidants for superfood nutrition.
category: Vegetables
Unit: kg
tags: Vegetables, Kale, Superfood, Green, Healthy

name: Fresh Okra
price: 40.00
description: Tender okra pods perfect for traditional Indian bhindi. Ideal for stir-fries and curries. Rich in fiber, vitamins, and minerals supporting digestive health.
category: Vegetables
Unit: kg
tags: Vegetables, Okra, Ladyfinger, Bhindi, Fresh

name: Fresh Lemon
price: 60.00
description: Juicy lemons with tangy flavor and bright yellow color. Essential for cooking, drinks, and garnishing. High in vitamin C, boosting immunity and adding zest to meals.
category: Fresh Fruit
Unit: kg
tags: Fresh Fruit, Lemon, Citrus, Tangy, Vitamin C

name: Fresh Mango
price: 100.00
description: Sweet mangoes with juicy golden flesh and tropical aroma. Perfect for eating fresh, smoothies, or desserts. The king of fruits, rich in vitamins A and C.
category: Fresh Fruit
Unit: Dozen
tags: Fresh Fruit, Mango, Tropical, Sweet, Seasonal

name: Fresh Onion
price: 35.00
description: Fresh onions with layers of flavor essential for Indian cooking. Perfect for curries, salads, and tempering. Adds depth and taste to every savory dish.
category: Vegetables
Unit: kg
tags: Vegetables, Onion, Fresh, Essential, Cooking

name: Fresh Orange
price: 80.00
description: Juicy oranges bursting with sweet citrus flavor. Perfect for fresh juice or snacking. Loaded with vitamin C and natural sugars for refreshing nutrition.
category: Fresh Fruit
Unit: kg
tags: Fresh Fruit, Orange, Citrus, Juicy, Vitamin C

name: Raw Peanuts
price: 90.00
description: Fresh raw peanuts perfect for roasting and cooking. Great for making chutney, snacks, or oil. High in protein and healthy fats for nutritious eating.
category: Dry Fruits
Unit: kg
tags: Dry Fruits, Peanut, Protein, Groundnut, Healthy

name: Fresh Pear
price: 150.00
description: Sweet juicy pears with soft texture and delicate flavor. Perfect for snacking, salads, or desserts. Rich in fiber and antioxidants for healthy indulgence.
category: Fresh Fruit
Unit: kg
tags: Fresh Fruit, Pear, Sweet, Juicy, Premium

name: Fresh Green Peas
price: 50.00
description: Tender green peas with natural sweetness. Perfect for pulao, curries, and mixed vegetables. High in protein and fiber for wholesome vegetarian meals.
category: Vegetables
Unit: kg
tags: Vegetables, Peas, Green, Fresh, Protein

name: Fresh Pomegranate
price: 120.00
description: Ruby-red pomegranate with juicy sweet-tart arils. Perfect for snacking, juices, or garnishing. Rich in antioxidants and vitamins for healthy living.
category: Fresh Fruit
Unit: kg
tags: Fresh Fruit, Pomegranate, Red, Antioxidants, Healthy

name: Fresh Potatoes
price: 25.00
description: Versatile potatoes perfect for any dish. Great for frying, mashing, curries, or roasting. A staple vegetable rich in carbohydrates and essential nutrients.
category: Vegetables
Unit: kg
tags: Vegetables, Potato, Fresh, Staple, Versatile

name: Fresh Pumpkin
price: 30.00
description: Orange pumpkin with sweet flesh and smooth texture. Perfect for curries, soups, and traditional dishes. Rich in beta-carotene and fiber for healthy cooking.
category: Vegetables
Unit: kg
tags: Vegetables, Pumpkin, Orange, Sweet, Nutritious

name: Fresh Raspberries
price: 400.00
description: Delicate raspberries with sweet-tart flavor and vibrant color. Perfect for desserts, smoothies, or fresh eating. Packed with antioxidants and vitamins for premium nutrition.
category: Fresh Fruit
Unit: kg
tags: Fresh Fruit, Raspberry, Berries, Premium, Antioxidants

name: Red Chilli
price: 150.00
description: Fiery red chilies adding intense heat and color. Essential for Indian masalas, curries, and tempering. Dried or fresh, they bring authentic spice to cooking.
category: Vegetables
Unit: kg
tags: Vegetables, Chilli, Red, Spicy, Hot

name: Red Capsicum
price: 100.00
description: Sweet red bell peppers with vibrant color and crunchy texture. Perfect for salads, grilling, and stir-fries. Exceptionally high in vitamin C and antioxidants.
category: Vegetables
Unit: kg
tags: Vegetables, Capsicum, Bell Pepper, Red, Sweet

name: Fresh Strawberries
price: 250.00
description: Sweet red strawberries with juicy flesh and aromatic flavor. Perfect for desserts, smoothies, or eating fresh. Rich in vitamin C and antioxidants for delicious nutrition.
category: Fresh Fruit
Unit: kg
tags: Fresh Fruit, Strawberry, Berries, Sweet, Red

name: Fresh Tangerine
price: 70.00
description: Easy-to-peel tangerines with sweet citrus flavor. Perfect for snacking and fresh juice. Loaded with vitamin C and natural sweetness for refreshing taste.
category: Fresh Fruit
Unit: kg
tags: Fresh Fruit, Tangerine, Citrus, Sweet, Easy Peel

name: Fresh Tomatoes
price: 30.00
description: Juicy red tomatoes perfect for Indian cooking. Essential for curries, salads, and sauces. Rich in lycopene and vitamins for everyday nutritious meals.
category: Vegetables
Unit: kg
tags: Vegetables, Tomato, Red, Fresh, Essential

name: Premium Walnuts
price: 800.00
description: Whole walnuts with rich flavor and crunchy texture. Perfect for snacking, desserts, and garnishing. Loaded with omega-3 fatty acids and antioxidants for brain health.
category: Dry Fruits
Unit: kg
tags: Dry Fruits, Walnut, Nuts, Omega-3, Premium

name: Fresh Watermelon
price: 40.00
description: Sweet red watermelon with juicy, refreshing flesh. Perfect summer fruit for hydration and cooling. Low in calories and high in vitamins for healthy snacking.
category: Fresh Fruit
Unit: kg
tags: Fresh Fruit, Watermelon, Red, Hydrating, Summer

name: Milk
price: 60.00
description: Fresh and creamy milk, perfect for drinking or cooking. Rich in calcium and essential nutrients for a healthy diet.
category: Dairy
Unit: Litre
tags: Dairy, Milk, Fresh, Creamy, Calcium

name: Cheese
price: 200.00
description: Rich and creamy cheese, perfect for snacking or cooking. Loaded with calcium and protein for a healthy diet.
category: Dairy
Unit: kg
tags: Dairy, Cheese, Creamy, Protein, Calcium

name: Paneer
price: 250.00
description: Fresh and soft paneer, perfect for Indian dishes. High in protein and calcium for a nutritious diet.
category: Dairy
Unit: kg
tags: Dairy, Paneer, Fresh, Soft, Protein

*/
